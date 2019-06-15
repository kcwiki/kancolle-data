const { every } = require('lodash')

const api = require('./api_start2.json')

const get = key => o => api[key].find(e => every(o, (v, k) => e[`api_${k}`] === v))

const getShip = get('api_mst_ship')

const getShipType = get('api_mst_stype')

const getEquipment = get('api_mst_slotitem')

const getEquipmentType = get('api_mst_slotitem_equiptype')

const getItem = get('api_mst_useitem')

module.exports = {
  ...api,
  getShip,
  getShipType,
  getEquipment,
  getEquipmentType,
  getItem,
}
