const { writeFileSync } = require('fs')
const { isArray } = require('lodash')

const data = require('..')

const typeOf = x => (isArray(x) ? 'array' : typeof x)

writeFileSync(
  `${__dirname}/../doc.md`,
  '# Exports\n\n```plain\n' +
    Object.keys(data)
      .map(
        key =>
          `${key} : ${typeOf(data[key])}${
            !key.startsWith('api_')
              ? Object.keys(data[key])
                  .map(key2 => `\n  ${key2} : ${typeOf(data[key][key2])}`)
                  .join('')
              : ''
          }`,
      )
      .join('\n') +
    '\n```\n',
)
