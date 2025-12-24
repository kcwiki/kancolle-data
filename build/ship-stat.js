// curl -o /tmp/ship-stat.json https://api.poi.moe/dump/ship-stat.json

const { readFileSync, outputJsonSync } = require('fs-extra')
const { find, uniq, isNumber, isNull, isArray, size } = require('lodash')
const { api_mst_ship } = require('..')
const ships = require('../wiki/ship.json')

const poiData = readFileSync('/tmp/ship-stat.json')
  .toString()
  .split('\n')
  .filter(Boolean)
  .map(e => JSON.parse(e))

const getStats = (minLastTs = undefined, minFirstTs = undefined, minCount = 1) => {
  const stats = {}
  for (const { _id, id, lv, evasion, evasion_max, asw, asw_max, los, los_max, count, last_timestamp } of poiData) {
    const firstTs = new Date(parseInt(_id['$oid'].substring(0, 8), 16) * 1000)
    const lastTs = new Date(last_timestamp)
    if (
      !count ||
      !last_timestamp ||
      (minFirstTs && firstTs < new Date(minFirstTs)) ||
      (minLastTs && lastTs < new Date(minLastTs)) ||
      count < minCount
    ) {
      continue
    }
    stats[id] = stats[id] || []
    const p1 = lv !== 99 && stats[id].find(e => e.lv === lv && e.evasion === evasion && e.asw === asw && e.los === los)
    if (!p1) {
      stats[id].push({ lv, evasion, asw, los, count })
    } else {
      p1.count += count
    }
    const p99 = stats[id].find(e => e.lv === 99 && e.evasion === evasion_max && e.asw === asw_max && e.los === los_max)
    if (!p99) {
      stats[id].push({ lv: 99, evasion: evasion_max, asw: asw_max, los: los_max, count })
    } else {
      p99.count += count
    }
  }
  return stats
}

const solve = (stats, id, stat) => {
  const solutions = []
  for (let min = 0; min <= 100; ++min) {
    for (let max = min; max <= 100; ++max) {
      if (stats[id] && stats[id].every(e => min + Math.floor(((max - min) * e.lv) / 99) === e[stat])) {
        solutions.push({ min, max })
      }
    }
  }
  return solutions
}

const solved = {}
const unsolved = {}

const minLastTss = ['2025-11-01', '2025-12-20', undefined]

const update = (x, y) => {
  if (isNull(y)) return x
  if (isNull(x)) return y
  if (isNumber(x) && isArray(y)) return x
  if (isArray(x) && isNumber(y)) return y
  if (isArray(x) && isArray(y)) return x.length <= y.length ? x : y
  if (x !== y) console.error('???')
  return x
}

for (const minLastTs of minLastTss) {
  const stats = getStats(minLastTs)
  for (const apiShip of api_mst_ship.filter(apiShip => apiShip.api_id <= 1500)) {
    const wikiShip = find(ships, wikiShip => wikiShip._api_id === apiShip.api_id) || { _name: apiShip.api_name }
    const name = `${wikiShip._name}${wikiShip._suffix ? `/${wikiShip._suffix}` : ''}`
    solved[name] = solved[name] || {}
    for (const stat of ['evasion', 'asw', 'los']) {
      const solutions = solve(stats, apiShip.api_id, stat)
      const min = uniq(solutions.map(e => e.min))
      const max = uniq(solutions.map(e => e.max))
      const data = [min.length === 0 ? null : min.length === 1 ? min[0] : min, max.length === 0 ? null : max.length === 1 ? max[0] : max]
      if (!solved[name][stat]) {
        solved[name][stat] = data
      } else {
        solved[name][stat][0] = update(solved[name][stat][0], data[0])
        solved[name][stat][1] = update(solved[name][stat][1], data[1])
      }
    }
  }
}

for (const apiShip of api_mst_ship.filter(apiShip => apiShip.api_id <= 1500)) {
  const wikiShip = find(ships, wikiShip => wikiShip._api_id === apiShip.api_id) || { _name: apiShip.api_name }
  const name = `${wikiShip._name}${wikiShip._suffix ? `/${wikiShip._suffix}` : ''}`
  for (const stat of ['evasion', 'asw', 'los']) {
    const [min, max] = solved[name][stat]
    if ((isNumber(min) && min !== (wikiShip[`_${stat}`] || 0)) || (isNumber(max) && max !== (wikiShip[`_${stat}_max`] || 0))) {
      console.log(`${name}: _${stat} = ${min}, _${stat}_max = ${max}`)
    }
    if (!isNumber(min) || !isNumber(max)) {
      unsolved[name] = unsolved[name] || {}
      unsolved[name][stat] = [min, max]
    }
  }
}

outputJsonSync(`${__dirname}/../db/ship-stat.json`, solved, { spaces: 2 })

if (size(unsolved)) {
  outputJsonSync(`${__dirname}/../db/ship-stat-unsolved.json`, unsolved, { spaces: 2 })
}
