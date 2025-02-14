require('dotenv').config()

const { outputJsonSync } = require('fs-extra')
const { Readable } = require('stream')
const { gunzipSync } = require('zlib')
const _ = require('lodash')
const sortKeys = require('sort-keys')
const fetch = require('node-fetch')
const StreamBSON = require('stream-bson')
const { Client } = require('pg')

const { getNodeLabel, getNodeType } = require('../map')

const queryTsun = async (...qs) => {
  const result = []
  const tsun = new Client()
  await tsun.connect()
  for (const q of qs) {
    try {
      console.log(`queryTsun: ${q.file}`)
      const { rows } = await tsun.query(q.query)
      const reducedRows = q.reduce ? q.reduce(rows) : rows
      result.push(reducedRows)
      if (q.file) {
        outputJsonSync(`${__dirname}/../db/${q.file}.json`, reducedRows)
      }
    } catch (e) {
      console.error(`queryTsun: ${q.query}`)
      console.error(e)
    }
  }
  await tsun.end()
  return result.length === 1 ? result[0] : result
}

const queryPoi = q =>
  new Promise(async resolve => {
    const data = {}
    console.log(`queryPoi: ${q.file}`)
    Readable.from(gunzipSync(await (await fetch(`https://api.poi.moe/dump/${q.dump}.gz`)).buffer()))
      .pipe(new StreamBSON({ archive: true }))
      .on('data', e => q.map(data, e))
      .on('finish', () => {
        const reducedData = q.reduce ? q.reduce(data) : data
        if (q.file) {
          outputJsonSync(`${__dirname}/../db/${q.file}.json`, reducedData)
        }
        resolve(reducedData)
      })
  })

const eventIds = +process.env.DB_EVENT_ID ? [+process.env.DB_EVENT_ID] : [] // _.range(50, 60 + 1)

const mapQuery = (eventId, mapId) => `(${(mapId ? [mapId] : _.range(1, 10 + 1)).map(mapId => `map='${eventId}-${mapId}'`).join(' or ')})`

const genNodeTypes = async eventId => {
  const nodeTypes = require(`../db/node_types_raw-${eventId}.json`)
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
  outputJsonSync(`${__dirname}/../db/node_types-${eventId}.json`, sortKeys(types, { deep: true }))
}

const main = async () => {
  if (process.env.DB_QUERY === 'ab') {
    for (const eventId of eventIds) {
      for (const mapId of _.range(5, 5 + 1)) {
        await queryTsun({
          query: `select * from enemycomp where (enemycomp->'isAirRaid') is not null and ${mapQuery(eventId, mapId)}`,
          file: `ab-${eventId}${mapId}`,
        })
      }
    }
    return
  }
  if (process.env.DB_QUERY === 'gauge') {
    for (const eventId of eventIds) {
      for (const mapId of _.range(5, 5 + 1)) {
        await queryTsun({
          query: `select map, node, difficulty, enemycomp->>'ship' as ship1, enemycomp->>'shipEscort' as ship2, enemycomp->>'mapStats' as mapStats, count(*)::int as count from enemycomp where ${mapQuery(
            eventId,
            mapId,
          )} and enemycomp#>>'{mapStats,gaugeNum}' is not null and enemycomp#>>'{mapStats,gaugeNum}' <> '-1' group by map, node, difficulty, enemycomp->>'ship', enemycomp->>'shipEscort', enemycomp->>'mapStats'`,
          file: `gauge-${eventId}${mapId}`,
        })
      }
    }
    return
  }
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
    {
      query: 'select * from equips',
      file: 'equipment',
      reduce: data =>
        _(data)
          .sortBy('id')
          .map(e => _.omit(e, ['version', 'origin', 'datetime']))
          .value(),
    },
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
  for (const eventId of eventIds) {
    await queryTsun(
      {
        query: `select map, edgeid[array_length(edgeid, 1)] as edge, (nodeinfo->>'flavorMessage') as message, count(*)::int from eventworld where ${mapQuery(
          eventId,
        )} and (nodeinfo->>'flavorMessage') is not null and (nodeinfo->>'eventId')::int=6 group by map, edgeid[array_length(edgeid, 1)], nodeinfo->>'flavorMessage'`,
        file: `flavor-${eventId}`,
        reduce: data => data.filter(e => e.message && e.count > 1 && !e.message.includes('?????')).map(e => _.omit(e, ['count'])),
      },
      {
        query: `select map, difficulty, rewards, selectreward from eventreward where ${mapQuery(eventId)} group by map, difficulty`,
        file: `reward-${eventId}`,
      },
      // `select count(*)::int, map, edgeid[array_length(edgeid, 1)] as edge, (nodeinfo->>'nodeType')::int as nodeColor, (nodeinfo->>'eventKind')::int as eventKind, (nodeinfo->>'eventId')::int as eventId from normalworld where ${mapQuery(eventId)} group by map, edgeid[array_length(edgeid, 1)], nodeinfo->>'nodeType', nodeinfo->>'eventKind', nodeinfo->>'eventId'`
      {
        query: `select count(*)::int, map, edgeid[array_length(edgeid, 1)] as edge, (nodeinfo->>'nodeColor')::int as nodeColor, (nodeinfo->>'eventKind')::int as eventKind, (nodeinfo->>'eventId')::int as eventId from eventworld where ${mapQuery(
          eventId,
        )} group by map, edgeid[array_length(edgeid, 1)], nodeinfo->>'nodeColor', nodeinfo->>'eventKind', nodeinfo->>'eventId'`,
        file: `node_types_raw-${eventId}`,
        reduce: data => data.filter(e => e.count > 1).map(e => _.omit(e, ['count'])),
      },
      {
        query: `select * from friendlyfleet where ${mapQuery(eventId)}`,
        file: `ff-${eventId}`,
      },
    )
    await genNodeTypes(eventId)
  }
}

main()
