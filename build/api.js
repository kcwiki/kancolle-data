const { readFileSync, writeFileSync } = require('fs')
const sortKeys = require('sort-keys')

const parseApi = s => {
  const r = JSON.parse(s.replace(/^.*svdata=/, ''))
  return sortKeys(r.api_data || r, { deep: true })
}

const api = parseApi(readFileSync('/tmp/api_start2').toString())

writeFileSync(`${__dirname}/../api/api_start2.json`, JSON.stringify(api, null, 2))
