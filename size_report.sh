# Distributions of brotli disagree on the name of the command
run_brotli() {
    if hash brotli 2>/dev/null; then
        brotli "$@"
    else
        bro "$@"
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
  run_brotli --force --quality 10 --input $script --output $script.brotli
  ls -alH ${script}.gz ${script}.brotli
done
