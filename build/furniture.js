/* Simple furniture scans.
 *
 * Using api_mst_furniture:
 *
 *   $ node build/furniture.js | sort > furniture.csv
 *
 * Using raw ids (1~999, ~2x slower):
 *
 *   $ node build/furniture.js - | sort > furniture.csv
 *
 */

const { map } = require('bluebird')
const { range } = require('lodash')
const fetch = require('node-fetch')
const { furniture, furnitureTypes } = require('../asset')

const ids = process.argv[2] ? range(1, 1000) : require('../api/api_start2.json').api_mst_furniture.map(e => e.api_id)

map(
  ids.flatMap(id => furnitureTypes.map(type => ({ id, type }))),
  async ({ id, type }) => {
    const url = furniture(id, type)
    const res = await fetch(url, { method: 'HEAD' })
    if (res.status === 200) {
      const date = new Date(res.headers.get('last-modified')).toISOString().split('T')[0]
      console.log(`${date}, ${url}`)
    }
  },
  { concurrency: +process.env.concurrency || 10 },
)
