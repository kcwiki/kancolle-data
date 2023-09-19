require('dotenv').config()

const { outputJsonSync } = require('fs-extra')
// const { Readable } = require('stream')
// const { gunzipSync } = require('zlib')
// const _ = require('lodash')
// const sortKeys = require('sort-keys')
// const fetch = require('node-fetch')
// const StreamBSON = require('stream-bson')
const { Client } = require('pg')

// const { getNodeLabel, getNodeType } = require('../map')

const queryTsun = async (...qs) => {
  const result = []
  const tsun = new Client()
  await tsun.connect()
  for (const q of qs) {
    console.log(`queryTsun : ${q.query}`)
    const { rows } = await tsun.query(q.query)
    result.push(rows)
    if (q.file) {
      outputJsonSync(`${__dirname}/../db/${q.file}.json`, q.reduce ? q.reduce(rows) : rows)
    }
    console.log('queryTsun: done')
  }
  await tsun.end()
  return result.length === 1 ? result[0] : result
}

/*
const queryPoi = q =>
  new Promise(async resolve => {
    const data = {}
    Readable.from(gunzipSync(await (await fetch(`https://api.poi.moe/dump/${q.dump}.gz`)).buffer()))
      .pipe(new StreamBSON({ archive: true }))
      .on('data', e => q.map(data, e))
      .on('finish', () => {
        outputJsonSync(`${__dirname}/../db/${q.file}.json`, q.reduce(data))
        resolve()
      })
  })

const eventIds = [57] // _.range(50, 60 + 1)

const mapQuery = () =>
  eventIds
    .map(eventId =>
      _.range(1, 10 + 1)
        .map(n => `map='${eventId}-${n}'`)
        .join(' or '),
    )
    .join(' or ')

const genNodeTypes = async () => {
  const nodeTypes = require('../db/node_types_raw.json')
  const types = {}
  for (const { map, edge, eventid, eventkind, nodecolor } of nodeTypes) {
    const mapId = map.replace('-', '')
    const label = getNodeLabel(mapId, edge)
    types[mapId] = types[mapId] || {}
    const type = getNodeType(eventid, eventkind, nodecolor)
    if (!type) {
      console.error(`unknown node type ${mapId} ${label} ${[eventid, eventkind, nodecolor]}`)
    }
    if (types[mapId][label] && types[mapId][label].type !== type) {
      console.error(`node type conflict for ${map} ${label}: ${types[mapId][label].type} vs ${type}`)
    } else {
      types[mapId][label] = { type, id: eventid, kind: eventkind, color: nodecolor }
    }
  }
  outputJsonSync(`${__dirname}/../db/node_types.json`, sortKeys(types, { deep: true }))
}
*/

const main = async () => {
  await queryTsun({
    query: `select column_name, data_type, character_maximum_length, column_default, is_nullable from INFORMATION_SCHEMA.COLUMNS where table_name = 'eventworld'`,
    file: `eventworld`,
  })
  /*
  await queryTsun(
    ..._.range(5, 7 + 1).map(i => ({
      query: `select * from enemycomp where (enemycomp->'isAirRaid') is not null and map='57-${i}'`,
      file: `57-${i}`,
    })),
  )
  await queryTsun(
    ..._.range(5, 7 + 1).map(i => ({
      query: `select map, node, difficulty, enemycomp->>'ship' as ship1, enemycomp->>'shipEscort' as ship2, enemycomp->>'mapStats' as mapStats, count(*) as count from enemycomp where map='57-${i}' and enemycomp#>>'{mapStats,gaugeNum}' is not null and enemycomp#>>'{mapStats,gaugeNum}' <> '-1' group by map, node, difficulty, enemycomp->>'ship', enemycomp->>'shipEscort', enemycomp->>'mapStats'`,
      file: `gauge-57${i}`,
    })),
  )
  */
  /*
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
    // {
    //   query: `select * from friendlyfleet where ${mapQuery()}`,
    //   file: 'ff',
    // },
    // Poi: N/A
    // `select count(*)::int, map, edgeid[array_length(edgeid, 1)] as edge, (nodeinfo->>'nodeType')::int as nodeColor, (nodeinfo->>'eventKind')::int as eventKind, (nodeinfo->>'eventId')::int as eventId from normalworld where ${mapQuery()} group by map, edgeid[array_length(edgeid, 1)], nodeinfo->>'nodeType', nodeinfo->>'eventKind', nodeinfo->>'eventId'`
    {
      query: `select count(*)::int, map, edgeid[array_length(edgeid, 1)] as edge, (nodeinfo->>'nodeColor')::int as nodeColor, (nodeinfo->>'eventKind')::int as eventKind, (nodeinfo->>'eventId')::int as eventId from eventworld where ${mapQuery()} group by map, edgeid[array_length(edgeid, 1)], nodeinfo->>'nodeColor', nodeinfo->>'eventKind', nodeinfo->>'eventId'`,
      file: 'node_types_raw',
      reduce: data => data.filter(e => e.count > 1).map(e => _.omit(e, ['count'])),
    },
    // Poi: N/A
    {
      query: `select map, edgeid[array_length(edgeid, 1)] as edge, (nodeinfo->>'flavorMessage') as message, count(*)::int from eventworld where (${mapQuery()}) and (nodeinfo->>'flavorMessage') is not null and (nodeinfo->>'eventId')::int=6 group by map, edgeid[array_length(edgeid, 1)], nodeinfo->>'flavorMessage'`,
      file: 'flavor',
      reduce: data => data.filter(e => e.message && e.count > 1 && !e.message.includes('?????')).map(e => _.omit(e, ['count'])),
    },
    // Poi: missing selectreward
    {
      query: `select map, difficulty, rewards, selectreward from eventreward where ${mapQuery()} group by map, difficulty`,
      file: 'reward',
    },
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
  await genNodeTypes()
  */
}

main()
