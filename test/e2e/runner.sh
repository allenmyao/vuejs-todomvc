#!/bin/bash

Xvfb :99 -screen 0 1024x768x16 >/dev/null &
export DISPLAY=:99
node ./test/e2e/runner.js
killall Xvfb
