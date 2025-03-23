#!/bin/sh

curl -s https://raw.githubusercontent.com/KC3Kai/KC3Kai/develop/src/data/edges.json | sed 's/World \([0-9]\+\)-\([0-9]\+\)/\1\2/' > map/edge.json
