const { pickBy } = require('lodash')

const api = require('./api')
const asset = require('./asset')
const map = require('./map')
const tl = require('./tl')
const wiki = require('./wiki')

module.exports = {
  api,
  asset,
  map,
  tl,
  wiki,
  ...pickBy(api, (_, key) => key.startsWith('api')),
  ...pickBy(tl, (_, key) => key.startsWith('tl')),
}
