const { _, sortBy, find, range, flatten, chunk, last } = require('lodash')
const { outputFileSync } = require('fs-extra')
const { format } = require('lua-json')

const { api_mst_ship } = require('../../api')
const ships = require('../../wiki/ship')
const { tlShipFromId } = require('../../tl')

const shipsByNoData = _(api_mst_ship)
  .filter(e => e.api_id <= 1500)
  .groupBy('api_sortno')
  .values()
  .map(e => sortBy(e, 'api_name')[0])
  .sortBy('api_sortno')
  .value()

const shipsByNo = flatten(
  chunk(
    range(1, Math.ceil(last(shipsByNoData).api_sortno / 10) * 10 + 1).map(no => {
      const e = shipsByNoData.find(e => e.api_sortno === no)
      return { id: e ? e.api_id : null, no, name: e ? tlShipFromId(e.api_id) : null }
    }),
    10,
  ).filter(e => e.map(e => e.name).some(Boolean)),
)

const tlShip = e => {
  const d = find(ships, e2 => e2._api_id === e.api_id)
  return d ? `${d._name}${d._suffix ? `/${d._suffix}` : ''}` : null
}

// TODO: better format

outputFileSync(
  'lua/ShipsByNo.lua',
  `${format(shipsByNo)
    .replace(/ {2}{\n\s+/g, '  { ')
    .replace(/,\n\s\s\s\s/g, ', ')
    .replace(/,\n\s\s}/g, ' }')}\n`,
)

outputFileSync(
  'lua/ShipsByApiId.lua',
  `return {\n${api_mst_ship
    .filter(e => e.api_taik)
    .map(e => `  [${e.api_id}] = "${tlShip(e)}",`)
    .join('\n')}\n}\n`,
)

outputFileSync(
  'lua/Ships.lua',
  `return {\n${api_mst_ship
    .filter(e => e.api_taik)
    .map(e => `  '${tlShip(e)}', -- ${e.api_id}`)
    .join('\n')}\n}\n`,
)
