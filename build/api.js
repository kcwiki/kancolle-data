const { readFileSync, writeFileSync } = require('fs')
const fetch = require('node-fetch')
const sortKeys = require('sort-keys')

const writeApi = s => {
  const data = JSON.parse(s.replace(/^.*svdata=/, ''))
  const sortedData = sortKeys(data.api_data || data, { deep: true })
  writeFileSync(`${__dirname}/../api/api_start2.json`, JSON.stringify(sortedData, null, 2))
}

const sources = {
  tibo: 'https://raw.githubusercontent.com/Tibowl/api_start2/master/start2.json',
  kcwiki: 'https://api.kcwiki.moe/start2',
}

const main = async () => {
  const source = sources[process.argv[2]] || process.argv[2] || sources.tibo
  writeApi(source.startsWith('http') ? await (await fetch(source)).text() : readFileSync(source).toString())
}

main()
