#!/bin/bash
while true; do
  npm run start >> /tmp/djkimlab-dev.log 2>&1
  echo "[$(date)] server exited, restarting in 2s..." >> /tmp/djkimlab-dev.log
  sleep 2
done
