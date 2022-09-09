const { _, transform, upperFirst } = require('lodash')

const api = require('../api')

const data = {
  ship: require('./ship.json'),
  equipment: require('./equipment.json'),
  enemy: require('./enemy.json'),
  enemyEquipment: require('./enemy-equipment.json'),
  shipType: require('./ship-type.json'),
  equipmentType: require('./equipment-type.json'),
  item: require('./item.json'),
  itemDescription: require('./item-description.json'),
}

const tl = name => {
  for (const key in data) {
    if (data[key][name]) {
      return data[key][name]
    }
  }
}

module.exports = tl

module.exports = Object.assign(module.exports, {
  ...data,
  ...transform(data, (result, value, key) => {
    result[`tl${upperFirst(key)}`] = name => value[name]
    const apiGetter = api[`get${upperFirst(key === 'enemy' ? 'ship' : key === 'enemyEquipment' ? 'equipment' : key)}`]
    if (apiGetter) {
      result[`tl${upperFirst(key)}FromId`] = id => {
        const name = (apiGetter({ id }) || {}).api_name
        return value[`${name}_${id}`] || value[name] || null
      }
    }
  }),
})

const shipBaseNames = _(api.api_mst_ship)
  .filter(e => e.api_id <= 1500 && e.api_name && !api.shipPrevIds[e.api_id])
  .map(e => module.exports.tlShipFromId(e.api_id))
  .value()

shipBaseNames.push('Souya')

module.exports.shipBaseNames = shipBaseNames
