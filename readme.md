# `@kancolle/data`

[![Version](https://img.shields.io/npm/v/@kancolle/data.svg)](https://www.npmjs.com/package/@kancolle/data)

KanColle data and data functions.

See [docs](doc.md) for available exports and [tests](test/index.js) for some examples.

## Install

```sh
yarn add @kancolle/data
```

## Pull

```sh
yarn pull-api      # pull API data from Tibo (default), kcwiki, file, or URL
yarn pull-db       # pull data from PoiDB and TsunDB (requires auth data in .env)
yarn pull-external # pull translations from Poi (../ or GitHub) and map edges from KC3Kai
yarn pull-wiki     # pull data from Wiki
yarn test          # format files and run tests
```

## Push

```sh
yarn push-wiki # push Wiki data modules (requires auth data in .env)
```

or run [actions](https://github.com/kcwiki/kancolle-data/actions/workflows/build.yml).
