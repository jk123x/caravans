#!/bin/bash
# Send multiple commands to Figma via the bridge (one per line on stdin)
# Keeps the bridge alive between commands for faster execution
# Usage: cat commands.jsonl | ./figma-cmd.sh
# Or: ./figma-cmd.sh <<'EOF'
# {"command":"create_text","params":{"x":0,"y":0,"text":"Hello"}}
# {"command":"create_rectangle","params":{"x":0,"y":100,"width":200,"height":50}}
# EOF

FIGMA_CHANNEL="${FIGMA_CHANNEL:-ggbybgir}" node /Users/jaykinkade/caravan/figma-bridge.mjs 2>/dev/null
