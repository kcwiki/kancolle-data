const test = require('tape')

const { api_mst_ship } = require('.')

test('api_mst_ship', t => {
  t.equals(api_mst_ship[0].api_id, 1)
  t.end()
})
