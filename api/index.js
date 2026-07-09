const { _, every } = require('lodash')

const api = require('./api_start2.json')

const get = key => o => api[key].find(e => every(o, (v, k) => e[`api_${k}`] === v))

const getShip = get('api_mst_ship')

const getShipType = get('api_mst_stype')

const getEquipment = get('api_mst_slotitem')

const getEquipmentType = get('api_mst_slotitem_equiptype')

const getItem = get('api_mst_useitem')

const shipPrevIds = _(api.api_mst_ship)
  .filter(e => +e.api_aftershipid)
  .groupBy('api_aftershipid')
  .mapValues(es => es[0].api_id)
  .value()

const isBaseShip = id => id <= 1500 && (id === 699 || !shipPrevIds[id])

module.exports = {
  ...api,
  getShip,
  getShipType,
  getEquipment,
  getEquipmentType,
  getItem,
  shipPrevIds,
  isBaseShip,
}
