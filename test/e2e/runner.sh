#!/bin/bash

xvfb-run --server-args="-screen 0 1024x768x16" node ./test/e2e/runner.js
