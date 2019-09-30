# `@kancolle/data`

[![Version](https://img.shields.io/npm/v/@kancolle/data.svg)](https://www.npmjs.com/package/@kancolle/data)
[![Build](https://img.shields.io/travis/kcwiki/kancolle-data.svg)](https://travis-ci.org/kcwiki/kancolle-data)
[![Dependencies](https://img.shields.io/david/kcwiki/kancolle-data.svg)](https://david-dm.org/kcwiki/kancolle-data)
[![Dev Dependencies](https://img.shields.io/david/dev/kcwiki/kancolle-data.svg)](https://david-dm.org/kcwiki/kancolle-data?type=dev)

KanColle data and data functions.

Currently includes:

- Game API response (`api_start2`).
- English translations.
- Some map data and functions.
- Some Wikia data.

## Install

```sh
yarn add @kancolle/data
```

## Usage

See [tests](https://github.com/kcwiki/kancolle-data/blob/master/test/index.js) for more examples.

### Game API

```js
const { api_mst_ship } = require('@kancolle/data')
api_mst_ship.find(e => e.api_name === '睦月').api_id // 1
```

or

```js
const { api } = require('@kancolle/data')
api.api_mst_ship.find(e => e.api_name === '睦月').api_id // 1
api.getShip({ name: '睦月' }).api_id // 1
api.getShip({ id: 1 }).api_name // '睦月'
// same for getShipType, getEquipment, getEquipmentType, getItem
```

See [TypeScript typings](https://github.com/kcwiki/kancolle-data/blob/master/api/api_start2.ts) for `api_start2` structure.

### Translations

```js
const { tl, tlShip, tlShipFromId } = require('@kancolle/data')
// translate anything:
tl('睦月') // 'Mutsuki'
tl('海防艦') // 'Coastal Defense Ship'
// translate ships:
tl.ship['睦月'] // 'Mutsuki'
tl.tlShip('睦月') // 'Mutsuki'
tl.tlShipFromId(1) // 'Mutsuki'
tlShip('睦月') // 'Mutsuki'
tlShipFromId(1) // 'Mutsuki'
// same for equipment, enemy, enemyEquipment, shipType, equipmentType, item
```

### Map

```js
const { map } = require('@kancolle/data')
map.getNodeLabel(445, 1) // 'A'
// etc., see API
```

### Wikia

```js
const { wiki } = require('@kancolle/data')
wiki.ship['Mutsuki Kai Ni'] // { ... }
```

### Partial imports

It is possible to import only parts of the library, which can decrease memory usage. For example:

```js
const { tlShip } = require('@kancolle/data/tl')
const shipTls = require('@kancolle/data/tl/ship')
const { getShip } = require('@kancolle/data/api')
const { getNodeLabel } = require('@kancolle/data/map')
const mapEdges = require('@kancolle/data/map/edge')
const wikiShips = require('@kancolle/data/wiki/ship')
```

## API

```plain
api : object
  api_mst_bgm : array
  api_mst_const : object
  api_mst_equip_exslot : array
  api_mst_equip_exslot_ship : array
  api_mst_equip_ship : array
  api_mst_furniture : array
  api_mst_furnituregraph : array
  api_mst_item_shop : object
  api_mst_maparea : array
  api_mst_mapbgm : array
  api_mst_mapinfo : array
  api_mst_mission : array
  api_mst_payitem : array
  api_mst_ship : array
  api_mst_shipgraph : array
  api_mst_shipupgrade : array
  api_mst_slotitem : array
  api_mst_slotitem_equiptype : array
  api_mst_stype : array
  api_mst_useitem : array
  getShip : function
  getShipType : function
  getEquipment : function
  getEquipmentType : function
  getItem : function
map : object
  edges : object
  diffs : object
  formations : object
  regularMaps : array
  battleRanks : array
  getNodeType : function
  getDiff : function
  getDiffId : function
  getFormation : function
  getFormationId : function
  getNodeLabel : function
  getNodeLabels : function
tl : function
  ship : object
  equipment : object
  enemy : object
  enemyEquipment : object
  shipType : object
  equipmentType : object
  item : object
  tlShip : function
  tlShipFromId : function
  tlEquipment : function
  tlEquipmentFromId : function
  tlEnemy : function
  tlEnemyFromId : function
  tlEnemyEquipment : function
  tlEnemyEquipmentFromId : function
  tlShipType : function
  tlShipTypeFromId : function
  tlEquipmentType : function
  tlEquipmentTypeFromId : function
  tlItem : function
  tlItemFromId : function
wiki : object
  enemy : object
  enemyEquipment : object
  equipment : object
  item : object
  misc : object
  ship : object
  quest : object
api_mst_bgm : array
api_mst_const : object
api_mst_equip_exslot : array
api_mst_equip_exslot_ship : array
api_mst_equip_ship : array
api_mst_furniture : array
api_mst_furnituregraph : array
api_mst_item_shop : object
api_mst_maparea : array
api_mst_mapbgm : array
api_mst_mapinfo : array
api_mst_mission : array
api_mst_payitem : array
api_mst_ship : array
api_mst_shipgraph : array
api_mst_shipupgrade : array
api_mst_slotitem : array
api_mst_slotitem_equiptype : array
api_mst_stype : array
api_mst_useitem : array
tlShip : function
tlShipFromId : function
tlEquipment : function
tlEquipmentFromId : function
tlEnemy : function
tlEnemyFromId : function
tlEnemyEquipment : function
tlEnemyEquipmentFromId : function
tlShipType : function
tlShipTypeFromId : function
tlEquipmentType : function
tlEquipmentTypeFromId : function
tlItem : function
tlItemFromId : function
```

## Updating

Generate game API with [kancolle-browser](https://github.com/kcwiki/kancolle-browser):

```sh
yarn global add @kancolle/browser # one time
yarn build-api
```

Generate translations and map data from Wikia (via Poi) and KC3Kai sources:

```sh
yarn build-external
```

Update Wikia data:

```sh
yarn build-wiki-data
```

Update dependencies:

```sh
yarn up
```

Run tests:

```sh
yarn test
```
