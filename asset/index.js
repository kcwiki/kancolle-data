const { padStart } = require('lodash')

const { api_mst_shipgraph } = require('../api')
const cgKeys = require('./cg')
const voiceKeys = require('./voice')

const key = s => s.split('').reduce((a, e) => a + e.charCodeAt(0), 0)

const create = (id, type) => (((17 * (id + 7) * cgKeys[(key(type) + id * type.length) % 100]) % 8973) + 1000).toString()

const ship =
  type =>
  (id, damaged, server = '203.104.209.71') => {
    const path = [
      padStart(id, 4, '0'),
      damaged && 'd',
      create(id, `ship_${type}`),
      (((type === 'full' || type === 'full_dmg') && api_mst_shipgraph.find(e => e.api_id === id)) || {}).api_filename,
    ]
      .filter(Boolean)
      .join('_')
    return `http://${server}/kcs2/resources/ship/${type}/${path}.png`
  }

const shipBanner = ship('banner')
const shipCard = ship('card')
const shipFull = ship('full')
const shipFull2 = ship('full2')
const shipFull0 = ship('character_full')

const shipBannerDamaged = id => ship('banner')(id, true)
const shipCardDamaged = id => ship('card')(id, true)
const shipFullDamaged = id => ship('full')(id, true)
const shipFull2Damaged = id => ship('full2')(id, true)
const shipFull0Damaged = id => ship('character_full')(id, true)

const shipVoice = (id, lineId) => (id <= 1500 && lineId <= 53 ? 100000 + ((17 * (id + 7) * voiceKeys[lineId - 1]) % 99173) : lineId)

const equipment =
  type =>
  (id, server = '203.104.209.71') =>
    `http://${server}/kcs2/resources/slot/${type}/${padStart(id, 3, '0')}_${create(id, `slot_${type}`)}.png`

const equipmentCard = equipment('card')
const equipmentFull = equipment('item_on')
const equipmentItem = equipment('item_up')
const equipmentCharacter = equipment('item_character')

const bgm = (id, type = 'port', server = '203.104.209.71') =>
  `http://${server}/kcs2/resources/bgm/${type}/${padStart(id, 3, '0')}_${create(id, `bgm_${type}`)}.mp3`

module.exports = {
  key,
  create,
  ship,
  shipBanner,
  shipCard,
  shipFull,
  shipFull2,
  shipFull0,
  shipBannerDamaged,
  shipCardDamaged,
  shipFullDamaged,
  shipFull2Damaged,
  shipFull0Damaged,
  shipVoice,
  equipment,
  equipmentCard,
  equipmentFull,
  equipmentItem,
  equipmentCharacter,
  bgm,
}
