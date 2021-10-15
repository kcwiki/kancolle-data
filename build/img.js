/* Usage:
 *
 *     $ git clone https://github.com/kcwiki/kancolle-data
 *     $ cd kancolle-data
 *     $ yarn
 *     (have gm (GraphicsMagick/ImageMagick) installed)
 *
 * Fetch everything using https://github.com/kcwiki/kancolle-data/blob/master/asset/image.json
 *
 *     $ node build/img.js
 *
 * Fetch something specific
 *
 *     $ node build/img.js common_event
 *
 * Use a specific directory
 *
 *     $ node build/img.js '' /tmp/kc/img
 *     $ node build/img.js common_event /tmp/kc/img
 *
 * Using a URL
 *
 *     $ node build/img.js kcs2/resources/map/051/01_image28
 *     $ node build/img.js kcs2/resources/map/051/01_image28 /tmp/kc/img
 *
 */

const { each, map } = require('bluebird')
const { existsSync, outputFileSync } = require('fs-extra')
const { toPairs } = require('lodash')
const fetch = require('node-fetch')
const gm = require('gm')

const dir = process.argv[3] || 'img'

const cachePng = async (folder, assets) =>
  !existsSync(`${dir}/${assets}.png`) &&
  outputFileSync(
    `${dir}/${assets}.png`,
    await (await fetch(`http://203.104.209.71/${folder ? `kcs2/img/${folder}/${assets}.png` : `${assets}.png`}`)).buffer(),
  )

map(
  process.argv[2] ? process.argv[2].split(',') : require('../asset/image.json'),
  async assets => {
    const folder = assets.startsWith('kcs2') ? null : assets.startsWith('battle_result') ? 'battle_result' : assets.split('_')[0]
    console.log(`${folder} ${assets}`)
    await cachePng(folder, assets)
    const { frames } = await (await fetch(`http://203.104.209.71/${folder ? `kcs2/img/${folder}/${assets}.json` : `${assets}.json`}`)).json()
    each(toPairs(frames), ([frame, { frame: f }]) =>
      gm(`${dir}/${assets}.png`)
        .crop(f.w, f.h, f.x, f.y)
        .write(`${dir}/${frame.endsWith('.png') ? frame : `${frame}.png`}`, err => err && console.error(err)),
    )
  },
  { concurrency: 10 },
)
