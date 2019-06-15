const { pickBy } = require('lodash')

const api = require('./api')
const map = require('./map')
const tl = require('./tl')

module.exports = {
  api,
  map,
  tl,
  ...pickBy(api, (_, key) => key.startsWith('api')),
  ...pickBy(tl, (_, key) => key.startsWith('tl')),
}
