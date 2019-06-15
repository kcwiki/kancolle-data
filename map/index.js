const { range, uniq } = require('lodash')

const edges = require('./edge.json')

const diffs = {
  1: 'Casual',
  2: 'Easy',
  3: 'Medium',
  4: 'Hard',
}

const formations = {
  1: 'Line Ahead',
  2: 'Double Line',
  3: 'Diamond',
  4: 'Echelon',
  5: 'Line Abreast',
  6: 'Vanguard',
  11: 'Cruising Formation 1',
  12: 'Cruising Formation 2',
  13: 'Cruising Formation 3',
  14: 'Cruising Formation 4',
}

// api_event_id, api_event_kind, api_color_no
const nodeTypes = {
  '2-0-2': 'Resource',
  '3-0-3': 'Storm',
  '4-1-4': 'Normal',
  '4-2-11': 'Night',
  '4-6-10': 'Defense',
  '4-8-13': 'Ambush',
  '5-1-5': 'Boss',
  '5-5-5': 'Boss',
  '6-0-4': 'Empty',
  '6-1-4': 'Empty',
  '6-2-4': 'Select',
  '9-0-6': 'Resource',
}

const regularMaps = [
  ...range(11, 16 + 1),
  ...range(21, 25 + 1),
  ...range(31, 35 + 1),
  ...range(41, 45 + 1),
  ...range(51, 55 + 1),
  ...range(61, 65 + 1),
  ...range(71, 72 + 1),
]

const battleRanks = ['S', 'A', 'B', 'C', 'D', 'E']

const getNodeType = (eventId, eventKind, nodeColor) => nodeTypes[`${eventId}-${eventKind}-${nodeColor}`]

const getDiff = id => diffs[id]

const getDiffId = name => parseInt(Object.keys(diffs).find(k => diffs[k] === name))

const getFormation = id => formations[id]

const getFormationId = name => parseInt(Object.keys(formations).find(k => formations[k] === name))

const getNodeLabel = (mapId, nodeId) => ((edges[mapId] || {})[nodeId] || {})[1]

const getNodeLabels = mapId =>
  uniq(
    Object.keys(edges[mapId] || {})
      .map(nodeId => edges[mapId][nodeId][1])
      .sort(),
  )

module.exports = {
  edges,
  diffs,
  formations,
  regularMaps,
  battleRanks,
  getNodeType,
  getDiff,
  getDiffId,
  getFormation,
  getFormationId,
  getNodeLabel,
  getNodeLabels,
}
