require('dotenv').config()

const { outputJsonSync } = require('fs-extra')
const { Readable } = require('stream')
const { gunzipSync } = require('zlib')
const _ = require('lodash')
const fetch = require('node-fetch')
const StreamBSON = require('stream-bson')
const { Client } = require('pg')

const queryTsun = async (...qs) => {
  const tsun = new Client()
  await tsun.connect()
  for (const q of qs) {
    const { rows } = await tsun.query(q.query)
    outputJsonSync(`${__dirname}/../db/${q.file}.json`, q.reduce(rows), { spaces: 2 })
  }
  await tsun.end()
}

const queryPoi = q =>
  new Promise(async resolve => {
    const data = {}
    Readable.from(gunzipSync(await (await fetch(`https://api.poi.moe/dump/${q.dump}.gz`)).buffer()))
      .pipe(new StreamBSON({ archive: true }))
      .on('data', e => q.map(data, e))
      .on('finish', () => {
        outputJsonSync(`${__dirname}/../db/${q.file}.json`, q.reduce(data), { spaces: 2 })
        resolve()
      })
  })

const main = async () => {
  // Tsun: N/A
  await queryPoi({
    dump: 'reciperecords',
    file: 'improvement',
    map: (data, e) => {
      data[e.itemId] = data[e.itemId] || 0
      ++data[e.itemId]
    },
    reduce: e => _.mapValues(e, () => true),
  })
  await queryTsun(
    // Poi: N/A
    {
      query: 'select * from equips',
      file: 'equipment',
      reduce: data =>
        _(data)
          .sortBy('id')
          .map(e => _.omit(e, ['version', 'origin', 'datetime']))
          .value(),
    },
    // Poi: createitemrecords, split
    {
      query: 'select result, count(*)::int from development where success = true and result > 0 group by result',
      file: 'development',
      reduce: data =>
        _(data)
          .sortBy('result')
          .map(data => [data.result, data.count])
          .fromPairs()
          .mapValues(() => true)
          .value(),
    },
  )
}

main()
