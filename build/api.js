const { readFileSync, writeFileSync } = require('fs')
const sortKeys = require('sort-keys')

const parseApi = s => sortKeys(JSON.parse(s.replace(/^.*svdata=/, '')).api_data, { deep: true })

const api = parseApi(readFileSync('/tmp/api_start2').toString())

writeFileSync(`${__dirname}/../api/api_start2.json`, JSON.stringify(api, null, 2))
