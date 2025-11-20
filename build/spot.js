const { map } = require('bluebird')
const { range, size } = require('lodash')
const { outputJsonSync } = require('fs-extra')
const fetch = require('node-fetch')

const { getServer } = require('../asset')
const { lastEventId } = require('../map')

const server = getServer(1)

const world = +process.argv[2] || lastEventId

const main = async () => {
  const data = {}
  await map(
    range(1, 10),
    async map => {
      const spots = []
      const airbases = []
      // eslint-disable-next-line no-constant-condition
      while (true) {
        try {
          const url = `http://${server}/kcs2/resources/map/0${world}/0${map}_info${spots.length || ''}.json`
          // console.log(`<http://${server}/kcs2/resources/map/0${world}/0${map}_image${spots.length || ''}.png>`)
          const data = await (await fetch(url)).json()
          spots.push.apply(spots, data.spots)
          if (data.airbase) {
            airbases.push(data.airbase)
          }
        } catch (_) {
          break
        }
      }
      spots.push.apply(
        spots,
        airbases.map(({ x, y }) => ({ no: -1, x, y })),
      )
      if (size(spots)) {
        data[map] = spots
      }
    },
    { concurrency: 10 },
  )
  if (size(data)) {
    outputJsonSync(`${__dirname}/../map/spot-${world}.json`, data)
  }
}

main()
