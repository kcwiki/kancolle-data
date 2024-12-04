const { padStart } = require('lodash')

const { api_mst_shipgraph } = require('../api')
const cgKeys = require('./cg')
const voiceKeys = require('./voice')
const servers = require('./server')

const getServer = id => (+id ? servers[id] : id)

const key = s => s.split('').reduce((a, e) => a + e.charCodeAt(0), 0)

const create = (id, type) => (((17 * (id + 7) * cgKeys[(key(type) + id * type.length) % 100]) % 8973) + 1000).toString()

const ship =
  type =>
  (id, damaged, debuffed, server = 1) => {
    const part1 = [type, damaged && 'dmg'].filter(Boolean).join('_')
    const part2 = [
      padStart(id, 4, '0'),
      debuffed && 'd',
      create(id, `ship_${part1}`),
      (((type === 'full' || type === 'full_dmg') && api_mst_shipgraph.find(e => e.api_id === id)) || {}).api_filename,
    ]
      .filter(Boolean)
      .join('_')
    return `http://${getServer(server)}/kcs2/resources/ship/${part1}/${part2}.png`
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

const shipBannerDebuffed = id => ship('banner')(id, false, true)
const shipCardDebuffed = id => ship('card')(id, false, true)
const shipFullDebuffed = id => ship('full')(id, false, true)
const shipFull2Debuffed = id => ship('full2')(id, false, true)
const shipFull0Debuffed = id => ship('character_full')(id, false, true)

const shipBannerDamagedDebuffed = id => ship('banner')(id, true, true)
const shipCardDamagedDebuffed = id => ship('card')(id, true, true)
const shipFullDamagedDebuffed = id => ship('full')(id, true, true)
const shipFull2DamagedDebuffed = id => ship('full2')(id, true, true)
const shipFull0DamagedDebuffed = id => ship('character_full')(id, true, true)

const shipVoice = (id, lineId) => (id <= 1500 && lineId <= 53 ? 100000 + ((17 * (id + 7) * voiceKeys[lineId - 1]) % 99173) : lineId)

const equipment =
  type =>
  (id, server = 1) =>
    `http://${getServer(server)}/kcs2/resources/slot/${type}/${padStart(id, 4, '0')}_${create(id, `slot_${type}`)}.png`

const equipmentCard = equipment('card')
const equipmentFull = equipment('item_on')
const equipmentItem = equipment('item_up')
const equipmentCharacter = equipment('item_character')

const bgm = (id, type = 'port', server = 1) =>
  `http://${getServer(server)}/kcs2/resources/bgm/${type}/${padStart(id, 3, '0')}_${create(id, `bgm_${type}`)}.mp3`

const furnitureTypes = ['normal', 'thumbnail', 'picture', 'card', 'reward', 'movable']

const furniture = (id, type = 'normal', server = 1) =>
  `http://${getServer(server)}/kcs2/resources/furniture/${type}/${padStart(id, 3, '0')}_${create(id, `furniture_${type}`)}.png`

module.exports = {
  getServer,
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
  shipBannerDebuffed,
  shipCardDebuffed,
  shipFullDebuffed,
  shipFull2Debuffed,
  shipFull0Debuffed,
  shipBannerDamagedDebuffed,
  shipCardDamagedDebuffed,
  shipFullDamagedDebuffed,
  shipFull2DamagedDebuffed,
  shipFull0DamagedDebuffed,
  shipVoice,
  equipment,
  equipmentCard,
  equipmentFull,
  equipmentItem,
  equipmentCharacter,
  bgm,
  furnitureTypes,
  furniture,
}
