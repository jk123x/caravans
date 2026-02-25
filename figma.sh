#!/bin/bash
# Send a command to Figma via the bridge
# Usage: ./figma.sh '{"command":"create_text","params":{"x":0,"y":0,"text":"Hello"}}'
echo "$1" | FIGMA_CHANNEL="${FIGMA_CHANNEL:-ggbybgir}" node /Users/jaykinkade/caravan/figma-bridge.mjs 2>/dev/null
