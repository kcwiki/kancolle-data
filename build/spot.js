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
      let phase = 1
      // eslint-disable-next-line no-constant-condition
      while (true) {
        try {
          const url = `http://${server}/kcs2/resources/map/0${world}/0${map}_info${spots.length || ''}.json`
          // console.log(`<http://${server}/kcs2/resources/map/0${world}/0${map}_image${spots.length || ''}.png>`)
          const data = await (await fetch(url)).json()
          data.airbases = data.airbases || []
          data.spots.forEach(spot => {
            spot.phase = phase
          })
          data.airbases.forEach(spot => {
            spot.phase = phase
          })
          ++phase
          spots.push.apply(spots, data.spots)
          spots.push.apply(airbases, data.airbases)
        } catch (_) {
          break
        }
      }
      spots.push.apply(
        spots,
        airbases.map(e => ({ no: -1, x: e.point.x, y: e.point.y })),
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
