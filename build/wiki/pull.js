require('dotenv').config()

const { map } = require('bluebird')
const { outputJson } = require('fs-extra')
const fetch_ = require('node-fetch')
const retry = require('async-retry')
const { _, forEach, fromPairs, toPairs, values, flatten, keyBy } = require('lodash')
const sortKeys = require('sort-keys')
const { parse: parseLua } = require('lua-json')

const ROOT = `${__dirname}/../..`

const host = process.env.WIKI_HOST || 'en.kancollewiki.net'
const username = process.env.WIKI_USERNAME
const password = process.env.WIKI_PASSWORD

let requests = 0
let bytes = 0

const headers = {
  'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36',
  cookie: process.env.WIKI_COOKIE,
}

const fetch = (url, parser = x => x, method = 'GET') =>
  retry(async () => {
    ++requests
    const res = await fetch_(url, { method, headers })
    const text = await res.text()
    bytes += text.length
    return { data: parser(text), headers: res.headers }
  })

const stringify = params =>
  _(params)
    .toPairs()
    .map(([k, v]) => `${k}=${v}`)
    .join('&')

const post = async (action, args) => {
  const params = { action, ...args, format: 'json' }
  const url = `https://${host}/w/api.php?${stringify(params)}`
  const { data, headers } = await fetch(url)
  if (action === 'login') {
    cookie = (headers['set-cookie'] || []).map(e => e.split(';')[0]).join(';') || null
  }
  return data
}

const login = async () => {
  try {
    const { login } = await post('login', { lgname: username, lgpassword: password })
    const { login: login2 } = await post('login', { lgname: username, lgpassword: password, lgtoken: login.token })
    if (login2.result !== 'Success' || login2.lgusername !== username) {
      console.error('FAILED: login')
    }
  } catch (_) {
    console.error('FAILED: login')
  }
}

const getLuaData = async name => {
  try {
    return (await fetch(`https://${host}/Module:${name}?action=raw`, parseLua)).data
  } catch (_) {
    console.error(`FAILED: getLuaData on ${name}`)
  }
}

const saveWikiData = async (name, obj, type = 'wiki', sort = false) => {
  const data = typeof obj === 'string' ? await getLuaData(obj) : obj
  if (data) {
    await outputJson(`${ROOT}/${type}/${name}.json`, sort ? sortKeys(data) : data, { spaces: 2 })
  }
}

const categories = {
  ship: 'Ship',
  enemy: 'Enemy',
  equipment: 'Equipment',
  enemyEquipment: 'EnemyEquipment',
  item: 'Item',
  quest: 'Quest',
}

const getLuaDataInCategory = async category => {
  const pages = []
  const loop = async (cont, i = 1) => {
    const params = {
      action: 'query',
      format: 'json',
      generator: 'allpages',
      gaplimit: 50,
      gapnamespace: 828, // Module
      gapfilterredir: 'nonredirects',
      gapprefix: `Data/${category}/`,
      prop: 'revisions',
      rvprop: 'content',
    }
    if (cont) {
      params.gapcontinue = cont
    }
    const url = `https://${host}/w/api.php?${stringify(params)}`
    let data
    try {
      data = (await fetch(url, JSON.parse)).data
    } catch (_) {
      console.error(`FAILED: getLuaDataInCategory on ${category}:${i}`)
    }
    if (!data) {
      return pages
    }
    const morePages = values(data.query.pages)
      .filter(e => !e.title.includes('Vita:') && !e.title.includes('Mist:'))
      .map(e => [e.title.replace('Module:', '').replace(/Data\/.+?\//, ''), parseLua(e.revisions[0]['*'])])
    morePages.forEach(e => pages.push(e))
    return data.continue ? loop(data.continue.gapcontinue, i + 1) : pages
  }
  return loop()
}

const fixApiYomi = name => name.replace(/\s?flagship/i, '').replace(/\s?elite/i, '')

const fixEnemySuffix = suffix =>
  fixApiYomi(suffix)
    .replace(/\s[IVX][IVX]*$/, '')
    .replace('- Damaged', 'Damaged')
    .trim()

const extractName = (context, type) => data => {
  // handle modules with multiple data parts
  if (!data._name) {
    if (_.isObject(data)) {
      return _.flatMap(data, extractName(context, type))
    }
    return []
  }
  // extract data from the module
  const { _name, _japanese_name: _jpName, _suffix, _display_suffix, _api_id: _apiId, _id } = data
  const isEnemy = type === 'enemy'
  const id = isEnemy && _apiId && _apiId < 1501 ? _apiId + 1000 : _apiId || _id
  const suffix = isEnemy ? _suffix && fixEnemySuffix(_suffix) : _display_suffix || _suffix
  const name = suffix ? `${_name} ${suffix}` : _name
  const fullEnemyName = isEnemy && (_suffix ? `${_name} ${_suffix.replace('- Damaged', 'Damaged')}` : _name)
  const jpName = isEnemy ? _jpName && fixApiYomi(_jpName) : _jpName
  // not sufficient data
  if (!jpName || (isEnemy && !id)) {
    return []
  }
  // incomplete module
  if (!id) {
    return [[jpName, name]]
  }
  // handle conflicts for this type
  const typeContext = context[type]
  if (typeContext[jpName] && (typeContext[jpName].name !== name || typeContext[jpName].fullEnemyName !== fullEnemyName)) {
    // will need to fix first translation later, guaranteed to be the right one by
    // getLuaDataInCategory order and wikia naming conventions
    typeContext[jpName].fix = true
    return [[`${jpName}_${id}`, fullEnemyName || name]]
  }
  typeContext[jpName] = {
    id,
    name,
    baseName: _name,
    fullEnemyName,
    type,
  }
  // warn about global conflicts
  const globalContext = context.global
  if (globalContext[jpName] && globalContext[jpName] !== name) {
    console.error(`WARNING: global name conflict for ${jpName}`)
  }
  globalContext[jpName] = name
  // no conflicts
  return [[jpName, name]]
}

const main = async () => {
  const data = fromPairs(
    await map(toPairs(categories), async ([categoryName, category]) => [categoryName, fromPairs(await getLuaDataInCategory(category))], {
      concurrency: 1,
    }),
  )
  data.quest = keyBy(flatten(values(data.quest)), 'label')
  const dataSorted = sortKeys(data, { deep: true })
  await map(toPairs(dataSorted), ([categoryName, data]) => outputJson(`${ROOT}/wiki/${categoryName}.json`, data, { spaces: 2 }))

  // extracting translations

  const context = { global: {} }
  const tls = _(data)
    .omit('quest')
    .map((articles, type) => {
      context[type] = context[type] || {}
      const typeResult = _(articles).flatMap(extractName(context, type)).fromPairs().value()
      // update first matches for all conflicts
      _(context[type]).forEach(({ id, name, baseName, fullEnemyName, fix }, jpName) => {
        if (fix || (name && fullEnemyName && name !== fullEnemyName)) {
          // support no context, currently only adding (?) for enemy equipment, also Souya needs a kludge
          typeResult[jpName] = (jpName === '宗谷' ? baseName : name) + (type === 'enemyEquipment' ? ' (?)' : '')
          typeResult[`${jpName}_${id}`] = fullEnemyName || name
        }
      })
      return [type, typeResult]
    })
    .value()

  await map(tls, async ([type, data]) => outputJson(`${ROOT}/tl/${_.kebabCase(type)}.json`, sortKeys(data), { spaces: 2 }))

  saveWikiData('equipment-type', 'Data/EquipmentTypeNames', 'tl', true)
  saveWikiData('ship-type', 'Data/ShipTypeNames', 'tl', true)

  // seasonal data

  const seasonal = {}
  forEach(dataSorted.ship, (shipData, ship) => {
    if (shipData.seasonals) {
      seasonal[ship] = shipData.seasonals
    }
  })
  await outputJson(`${ROOT}/wiki/seasonal.json`, seasonal, { spaces: 2 })

  // flat ships

  const ships = {}

  forEach(dataSorted.ship, (shipData, ship) =>
    forEach(shipData, (formData, form) => {
      if (formData._hp) {
        const fullName = `${ship} ${form}`.trim()
        ships[fullName] = formData
        ships[fullName]._full_name = fullName
      }
    }),
  )

  const fix = (data, key, closest) => {
    let curr = data
    let from = (curr._remodel_from || '').replace('/', ' ').trim()
    while (from && (!closest || !curr[key])) {
      curr = ships[from]
      from = (curr._remodel_from || '').replace('/', ' ').trim()
    }
    data[key] = curr[key]
  }

  const { shipBaseNames } = require(`${ROOT}/tl`)

  forEach(ships, data => {
    fix(data, '_implementation_date', true)
    fix(data, '_voice_actor')
    fix(data, '_artist')
    fix(data, '_availability')
    fix(data, '_wikipedia')
    fix(data, '_build_time')
    if (!shipBaseNames.includes(data._full_name)) {
      delete data._buildable
      delete data._buildable_lsc
    }
  })

  await outputJson(`${ROOT}/wiki/ship.json`, ships, { spaces: 2 })

  // flat enemies

  const enemies = {}

  forEach(dataSorted.enemy, (shipData, ship) =>
    forEach(shipData, (formData, form) => {
      if (formData._japanese_name) {
        const fullName = `${ship} ${form}`.trim()
        enemies[fullName] = formData
        enemies[fullName]._full_name = fullName
      }
    }),
  )

  await outputJson(`${ROOT}/wiki/enemy.json`, enemies, { spaces: 2 })

  // misc data: https://en.kancollewiki.net/w/index.php?search=Misc+data+modules&ns828=1

  const misc = require(`${ROOT}/wiki/misc.json`)

  for (const name in misc) {
    misc[name] = (await getLuaData(name)) || misc[name]
  }

  await saveWikiData('misc', misc)
  await saveWikiData('refit', 'Data/EquipmentRefit')
  await saveWikiData('refit-re', 'Data/EquipmentRefitRE')

  console.log(`wiki requests: ${requests}`)
  console.log(`wiki bytes: ${bytes}`)
}

main()
