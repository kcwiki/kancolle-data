/*

Example:

$ node build/map-files.js 625

Gives:

Gimmick 1
Gimmick 2
Phase 1
Phase 2
Gimmick 3
Gimmick 4
Phase 3
Phase 4

*/

const _ = require('lodash')

const mapId = +process.argv[2]

const spots = require(`../map/spot-${Math.floor(mapId / 10)}.json`)[mapId % 10]
const types = require(`../db/node_types-${Math.floor(mapId / 10)}.json`)[mapId]
const edges = require('../map/edge.json')[mapId]

let phases = 0
let gimmicks = 0

console.log(
  _(spots)
    .groupBy('phase')
    .pickBy((_, phase) => +phase)
    .mapValues(spots => spots.map(spot => types[edges[spot.no]?.[1]]?.type).includes('Boss'))
    .map(isPhase => (isPhase ? `Phase ${++phases}` : `Gimmick ${++gimmicks}`))
    .join('\n'),
)
