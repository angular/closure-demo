#!/usr/bin/env bash

# Distributions of brotli disagree on the args
run_brotli() {
    input=$1
    unamestr=$(uname)
    if [[ "$unamestr" == 'Linux' ]]; then
        brotli --input ${input} --quality 10 --output $input.brotli --force
    else
        brotli $input --quality=10 --output=$input.brotli --force
    fi
}

# measure the sizes of scripts the user will need to load
for script in dist/bundle.js node_modules/zone.js/dist/zone.min.js; do
  # gzip on linux doesn't have --keep
  cp $script $script.bak
  gzip -f $script
  mv $script.bak $script
  # requires brotli
  # on Mac: brew install brotli
  run_brotli $script
  ls -alH ${script}.gz ${script}.brotli
done
