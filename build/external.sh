#!/bin/sh

# translations

fetch_tl() {
  curl -s "https://raw.githubusercontent.com/poooi/plugin-translator/master/i18n-source/$1/en-US.json" > "tl/${2:-$1}.json"
}

fetch_tl ship
fetch_tl slotitem equipment
fetch_tl ship-abyssal enemy
fetch_tl slotitem-abyssal enemy-equipment
fetch_tl ship-type
fetch_tl slotitem-type equipment-type
fetch_tl useitem item

# map edges

curl -s https://raw.githubusercontent.com/KC3Kai/KC3Kai/develop/src/data/edges.json | sed 's/World \([0-9]\+\)-\([0-9]\+\)/\1\2/' > map/edge.json
