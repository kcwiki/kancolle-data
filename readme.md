KanColle's `api_start2` response.

[![npm package](https://img.shields.io/npm/v/@kancolle/data.svg)](https://www.npmjs.org/package/@kancolle/data)
[![build status](https://img.shields.io/travis/kcwiki/kancolle-data.svg)](http://travis-ci.org/kcwiki/kancolle-data)
[![devDependencies](https://img.shields.io/david/dev/kcwiki/kancolle-data.svg)](https://david-dm.org/kcwiki/kancolle-data?type=dev)

## Install

```sh
yarn add @kancolle/data
```

## Usage

Module returns [`api_data` from the response](https://github.com/kcwiki/kancolle-data/blob/master/dist/api_start2.json) as is:

```js
const { api_mst_ship } = require('@kancolle/data')
```
