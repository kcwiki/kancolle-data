const { map } = require('bluebird')
const { outputJson } = require('fs-extra')
const fetch = require('node-fetch')
const { _, forEach, fromPairs, toPairs, values, flatten, keyBy } = require('lodash')
const sortKeys = require('sort-keys')
const { parse } = require('lua-json')

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
  const loop = async cont => {
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
    const url = `https://kancolle.fandom.com/api.php?${_(params)
      .toPairs()
      .map(([k, v]) => `${k}=${v}`)
      .join('&')}`
    const data = await (await fetch(url)).json()
    const morePages = values(data.query.pages)
      .filter(e => !e.title.includes('Vita:') && !e.title.includes('Mist:'))
      .map(e => [e.title.replace('Module:', '').replace(/Data\/.+?\//, ''), parse(e.revisions[0]['*'])])
    morePages.forEach(e => pages.push(e))
    return data.continue ? loop(data.continue.gapcontinue) : pages
  }
  return loop()
}

const main = async () => {
  const data = fromPairs(
    await map(toPairs(categories), async ([categoryName, category]) => [categoryName, fromPairs(await getLuaDataInCategory(category))]),
  )
  data.quest = keyBy(flatten(values(data.quest)), 'label')
  const dataSorted = sortKeys(data, { deep: true })
  await map(toPairs(dataSorted), ([categoryName, data]) => outputJson(`${__dirname}/../wiki/${categoryName}.json`, data, { spaces: 2 }))

  // seasonal data

  const seasonal = {}
  forEach(dataSorted.ship, (shipData, ship) => {
    if (shipData.seasonals) {
      seasonal[ship] = shipData.seasonals
    }
  })
  await outputJson(`${__dirname}/../wiki/seasonal.json`, seasonal, { spaces: 2 })

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

  forEach(ships, data => {
    fix(data, '_implementation_date', true)
    fix(data, '_voice_actor')
    fix(data, '_artist')
    fix(data, '_availability')
    fix(data, '_wikipedia')
    fix(data, '_buildable')
    fix(data, '_buildable_lsc')
    fix(data, '_build_time')
  })

  await outputJson(`${__dirname}/../wiki/ship.json`, ships, { spaces: 2 })

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

  await outputJson(`${__dirname}/../wiki/enemy.json`, enemies, { spaces: 2 })
}

main()
