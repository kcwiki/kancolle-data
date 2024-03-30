const { outputJsonSync, outputFileSync } = require('fs-extra')
const { uniq, difference, union, keys, range, _ } = require('lodash')
const { format } = require('lua-json')

const { api_mst_stype, api_mst_ship, api_mst_slotitem, api_mst_equip_ship, tlShipFromId, tlEquipmentFromId } = require('..')
const { getEquipTypes, SlotUtil } = require('../../kancolle-main/dist/main')

const ships = {}
const hardcode = {}

const equipmentTypes = keys(api_mst_stype[0].api_equip_type).map(Number)

for (const ship of api_mst_ship.filter(e => e.api_id <= 1500)) {
  const shipName = tlShipFromId(ship.api_id)
  for (const equipmentType of equipmentTypes) {
    if (SlotUtil.isMstEquipShipExceptionSlotItem(ship.api_id, equipmentType, 0)) {
      for (const equipment of api_mst_slotitem.filter(e => e.api_id <= 1500)) {
        if (!SlotUtil.isMstEquipShipExceptionSlotItem(ship.api_id, equipmentType, equipment.api_id)) {
          const equipmentName = tlEquipmentFromId(equipment.api_id)
          let p = (hardcode[`${ship.api_stype}-${equipmentType}`] = hardcode[`${ship.api_stype}-${equipmentType}`] || {})
          p = p[equipmentName] = p[equipmentName] || {}
          p[shipName] = true
        }
      }
    }
  }
  const { api_equip_type: shipEquipmentTypes } = api_mst_equip_ship.find(e => e.api_ship_id === ship.api_id) || {}
  if (!shipEquipmentTypes) continue
  const p = (ships[ship.api_stype] = ships[ship.api_stype] || {})
  for (const equipmentType of shipEquipmentTypes) {
    p[equipmentType] = p[equipmentType] || { allowed: [], disallowed: [] }
    p[equipmentType].allowed.push(shipName)
  }
  for (const equipmentType of equipmentTypes) {
    if (!shipEquipmentTypes.includes(equipmentType)) {
      p[equipmentType] = p[equipmentType] || { allowed: [], disallowed: [] }
      p[equipmentType].disallowed.push(shipName)
    }
  }
}

const getAll = shipType => api_mst_ship.filter(e => e.api_id <= 1500 && e.api_stype === shipType).map(e => tlShipFromId(e.api_id))
const getAllowed = (shipType, equipmentType) => uniq(((ships[shipType] || {})[equipmentType] || {}).allowed || [])
const getDisallowed = (shipType, equipmentType) => uniq(((ships[shipType] || {})[equipmentType] || {}).disallowed || [])

const getExcluded = (shipType, equipmentType, equipmentName) =>
  _(hardcode[`${shipType}-${equipmentType}`] || {})
    .toPairs()
    .filter(e => !equipmentName || equipmentName === e[0])
    .flatMap(e => keys(e[1]))
    .uniq()
    .value()

const formatOnly = shipNames => `Only: ${shipNames.join(', ')}`
const formatExcept = shipNames => `Except: ${shipNames.join(', ')}`

const result = {}

for (const { api_id: shipType, api_equip_type: equipmentTypes } of api_mst_stype) {
  const r = (result[shipType] = {})
  const all = getAll(shipType)
  for (const equipmentType in equipmentTypes) {
    if (equipmentTypes[equipmentType]) {
      const disallowed = union(getDisallowed(shipType, equipmentType), getExcluded(shipType, equipmentType)).sort()
      const allowed = difference(all, disallowed).sort()
      r[equipmentType] = allowed.length <= disallowed.length ? formatOnly(allowed) : disallowed.length ? formatExcept(disallowed) : true
      for (const equipmentName in hardcode[`${shipType}-${equipmentType}`] || {}) {
        const unexcluded = getExcluded(shipType, equipmentType, equipmentName)
        const allowed2 = union(allowed, unexcluded).sort()
        const disallowed2 = difference(disallowed, unexcluded).sort()
        if (!disallowed2.length) throw '???'
        r[equipmentName] = allowed2.length <= disallowed2.length ? formatOnly(allowed2) : formatExcept(disallowed2)
      }
    } else {
      const allowed = difference(getAllowed(shipType, equipmentType), getExcluded(shipType, equipmentType)).sort()
      const disallowed = difference(all, allowed).sort()
      if (allowed.length) {
        r[equipmentType] = allowed.length <= disallowed.length ? formatOnly(allowed) : formatExcept(disallowed)
      }
      for (const equipmentName in hardcode[`${shipType}-${equipmentType}`] || {}) {
        const allowed2 = union(allowed, getExcluded(shipType, equipmentType, equipmentName)).sort()
        const disallowed2 = difference(all, allowed2).sort()
        if (!disallowed2.length) throw '???'
        r[equipmentName] = allowed2.length <= disallowed2.length ? formatOnly(allowed2) : formatExcept(disallowed2)
      }
    }
  }
}

result['AirBase'] = _(range(10))
  .flatMap(getEquipTypes)
  .map(t => [t, true])
  .fromPairs()
  .value()

outputJsonSync(`${__dirname}/../wiki/refit.json`, result, { spaces: 2 })
outputFileSync(`${__dirname}/../wiki/refit.lua`, format(result, { numberKeys: true }))
