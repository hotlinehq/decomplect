#!/usr/bin/env bash
# Downloads the source transcripts used to build this skill into transcripts/raw/.
# They come from matthiasn/talk-transcripts, which has no license grant,
# so they are not committed to this repository.
set -euo pipefail
dir="$(cd "$(dirname "$0")" && pwd)/raw"
tmp="$(mktemp -d)"
git clone --depth 1 --filter=blob:none --sparse https://github.com/matthiasn/talk-transcripts "$tmp"
git -C "$tmp" sparse-checkout set --no-cone 'Hickey_Rich/*.md'
mkdir -p "$dir"
cp "$tmp"/Hickey_Rich/*.md "$dir"/
rm -rf "$tmp"
echo "Transcripts saved to $dir"
