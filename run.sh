#!/bin/sh -e

RUNMODE="${1:-start}"

dockerize -template /etc/nginx/nginx.conf:/etc/nginx/nginx.conf \
          -template /app/js/settings.js:/app/js/settings.js

if [ "${RUNMODE}" = "check" ]; then
    /usr/sbin/nginx -t
else
    echo "Starting jwallet-web service, version: `cat /app/version.txt` on node `hostname`"
    /usr/sbin/nginx
fi
