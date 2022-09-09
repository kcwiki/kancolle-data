require('dotenv').config()

const { promisifyAll } = require('bluebird')
const _ = require('lodash')
const { format } = require('lua-json')
const MW = require('nodemw')

const { api_mst_slotitem } = require('../../api/api_start2.json')
const { tlEquipmentFromId } = require('../../tl')
const eqData = require('../../wiki/equipment.json')
const eqDb = require('../../db/equipment.json')
const eqDevelopment = require('../../db/development.json')
const eqImprovement = require('../../db/improvement.json')

const targets = process.argv[2].split(',').map(e => +e || e)

const mw = promisifyAll(
  new MW({
    protocol: 'https',
    server: process.env.WIKI_HOST,
    path: process.env.WIKI_PATH,
    username: process.env.BOT_USERNAME,
    password: process.env.BOT_PASSWORD,
  }),
)

const old =
  (key, def = undefined) =>
  id => {
    const res = (Object.values(eqData).find(data => data._id === id) || {})[`_${key}`]
    return !_.isUndefined(res) ? res : def
  }

const info = id => {
  const data = _.find(eqDb, e => e.id === id)
  if (!data) console.warn(`no description for: ${id}`)
  return (data || {}).description
}

const buildable = id => (eqDevelopment[id] ? true : false)

const improvements = id => {
  const data = old('improvements')(id)
  return typeof data === 'object' ? data : eqImprovement[id] ? true : false
}

const schema = {
  name: [tlEquipmentFromId, 'id'],
  localized_name: [old('localized_name'), 'id'],
  id: 'id',
  item_id: [old('item_id'), 'id'],
  japanese_name: 'name',
  reading: [old('reading', null), 'id'],
  strict_name: [old('strict_name'), 'id'],
  strict_japanese_name: [old('strict_japanese_name'), 'id'],
  strict_reading: [old('strict_reading'), 'id'],
  library_name: [old('library_name'), 'id'],
  library_japanese_name: [old('library_japanese_name'), 'id'],
  library_reading: [old('library_reading'), 'id'],
  comparison_name: [old('comparison_name'), 'id'],
  comparison_japanese_name: [old('comparison_japanese_name'), 'id'],
  comparison_reading: [old('comparison_reading'), 'id'],
  list_name: [old('list_name'), 'id'],
  list_japanese_name: [old('list_japanese_name'), 'id'],
  list_reading: [old('list_reading'), 'id'],
  card_name: [old('card_name'), 'id'],
  card_localized_name: [old('card_localized_name'), 'id'],
  card_japanese_name: [old('card_japanese_name'), 'id'],
  card_reading: [old('card_reading'), 'id'],
  album_type: [old('album_type'), 'id'],
  type: ['type', 2],
  icon: ['type', 3],
  types: 'type',
  rarity: ['rare', 'raw'],
  back: [old('back'), 'id'],
  stars: [old('stars'), 'id'],
  firepower: 'houg',
  bombing: 'baku',
  torpedo: 'raig',
  aa: 'tyku',
  armor: 'souk',
  asw: 'tais',
  shelling_accuracy: 'houm',
  torpedo_accuracy: 'raim',
  evasion: 'houk',
  los: 'saku',
  speed: 'soku',
  luck: 'luck',
  range: 'leng',
  flight_cost: 'cost',
  flight_range: 'distance',
  special: [old('special'), 'id'],
  scrap_fuel: ['broken', 0],
  scrap_ammo: ['broken', 1],
  scrap_steel: ['broken', 2],
  scrap_bauxite: ['broken', 3],
  version: 'version',
  info: [info, 'id'],
  can_attack_installations: [old('can_attack_installations'), 'id'],
  gun_fit_group: [old('gun_fit_group'), 'id'],
  asw_damage_type: [old('asw_damage_type'), 'id'],
  wikipedia: [old('wikipedia'), 'id'],
  buildable: [buildable, 'id'],
  improvements: [improvements, 'id'],
  bonus: [old('bonus'), 'id'],
}

const mapKey = (key, eq) => {
  const apiKey = schema[key]
  if (_.isString(apiKey)) return [`api_${apiKey}`, _.isUndefined(eq[`api_${apiKey}`]) ? undefined : eq[`api_${apiKey}`] || false]
  else if (_.isArray(apiKey) && _.isString(apiKey[0]) && _.isNumber(apiKey[1]))
    return [`api_${apiKey[0]}`, _.isUndefined(eq[`api_${apiKey[0]}`]) ? undefined : (eq[`api_${apiKey[0]}`] || [])[apiKey[1]] || false]
  else if (_.isArray(apiKey) && _.isString(apiKey[0]) && apiKey[1] == 'raw') return [`api_${apiKey[0]}`, eq[`api_${apiKey[0]}`]]
  else if (_.isArray(apiKey) && _.isFunction(apiKey[0])) return [undefined, apiKey[0](eq[`api_${apiKey[1]}`])]
  else {
    console.error(`unknown schema: ${key} ${apiKey}`)
    return [undefined, undefined]
  }
}

const genEq = eq => {
  if (eq.api_sortno === eq.api_id) delete eq.api_sortno
  for (const key of ['atap', 'bakk', 'raik', 'sakb', 'taik', 'usebull', 'sortno', 'version']) {
    if (+eq[`api_${key}`] === 0) delete eq[`api_${key}`]
  }
  const eqCopy = { ...eq }
  const data = {}
  for (const key in schema) {
    const [apiKey, val] = mapKey(key, eq)
    if (!_.isUndefined(val)) data[`_${key}`] = val
    if (apiKey) delete eqCopy[apiKey]
  }
  if (_.size(eqCopy)) console.error(`unknown API: ${JSON.stringify(eqCopy)}`)
  return data
}

const main = async () => {
  console.log(`building wiki equipment data modules for: ${targets}...`)
  !process.env.test && (await mw.logInAsync())
  const eqs = api_mst_slotitem.filter(e => e.api_id <= 500)
  if (targets.includes('index')) {
    const index = eqs.map(eq => ({ _id: eq.api_id, _name: tlEquipmentFromId(eq.api_id), _type: eq.api_type[2], _icon: eq.api_type[3] }))
    const content = format(_.sortBy(index, '_id'))
      .replace(/\n {4}/g, ' ')
      .replace(/,\n {2}}/g, ' }')
    process.env.test ? console.log(content) : await mw.editAsync('Module:Data/Equipment', content, 'GitHub Action')
  }
  for (const eq of eqs.filter(eq => targets.includes('all') || targets.includes(eq.api_id))) {
    try {
      const data = genEq(eq)
      const title = `Module:Data/Equipment/${data._name || data._japanese_name}`
      const content = format(data, { singleQuote: false }).replace(
        /_types = {\n\s+(\d+),\s+(\d+),\s+(\d+),\s+(\d+),\s+(\d+),\s+}/,
        '_types = {$1, $2, $3, $4, $5}',
      )
      process.env.test ? console.log(content) : await mw.editAsync(title, content, 'GitHub Action')
    } catch (e) {
      console.error(`generation failed for: ${e.api_id}`)
    }
  }
}

main()
