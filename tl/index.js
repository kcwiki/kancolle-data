const { transform, upperFirst } = require('lodash')

const api = require('../api')

const data = {
  ship: require('./ship.json'),
  equipment: require('./equipment.json'),
  enemy: require('./enemy.json'),
  enemyEquipment: require('./enemy-equipment.json'),
  shipType: require('./ship-type.json'),
  equipmentType: require('./equipment-type.json'),
  item: require('./item.json'),
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
      result[`tl${upperFirst(key)}FromId`] = id => value[`${apiGetter({ id }).api_name}${key === 'enemy' ? `_${id}` : ''}`]
    }
  }),
})
