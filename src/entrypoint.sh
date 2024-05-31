#! /bin/bash
if [ ! -d "node_modules" ]; then
  npm ci
  npx playwright install --with-deps
fi
sleep infinity
