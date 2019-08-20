const { map, promisifyAll } = require('bluebird')
const { outputJson } = require('fs-extra')
const { forEach, fromPairs, toPairs, values, flatten, keyBy } = require('lodash')
const MW = require('nodemw')
const sortKeys = require('sort-keys')
const { parse } = require('lua-json')

const concurrency = process.env.concurrency || 50

const categories = {
  ship: 'Player ship modules',
  enemy: 'Enemy ship modules',
  boss: 'Enemy boss ship modules',
  equipment: 'Equipment modules',
  enemyEquipment: 'Enemy equipment modules',
  item: 'Item modules',
  misc: 'Misc data modules',
  quest: 'Quest modules',
}

const main = async () => {
  const bot = promisifyAll(new MW({ protocol: 'https', server: 'kancolle.fandom.com', concurrency }))
  const data = fromPairs(
    await map(
      toPairs(categories),
      async ([categoryName, category]) => {
        const titles = (await bot.getPagesInCategoryAsync(category)).filter(e => e.title.startsWith('Module:')).map(e => e.title)
        const modules = await map(titles, async title => [title.replace('Module:', ''), parse(await bot.getArticleAsync(title))], { concurrency })
        return [categoryName, fromPairs(modules)]
      },
      { concurrency: 1 },
    ),
  )
  data.enemy = { ...data.enemy, ...data.boss }
  delete data.boss
  data.quest = keyBy(flatten(values(data.quest)), 'label')
  const dataSorted = sortKeys(data, { deep: true })
  await map(toPairs(dataSorted), ([categoryName, data]) => outputJson(`${__dirname}/../wiki/${categoryName}.json`, data, { spaces: 2 }))

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
