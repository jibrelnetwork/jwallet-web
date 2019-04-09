#!/bin/sh -e

RUNMODE="${1:-start}"
ENVIRONMENT="${ENV:-undefined}"

if [ "${RUNMODE}" = "check" ]; then
    # Copy all available configs for checking them
    cp /etc/nginx/templates/*.conf /etc/nginx/includes 2>/dev/null
    /usr/sbin/nginx -t
    # Remove includes after checking
    rm -rf /etc/nginx/includes/*
else
    echo "Starting jwallet-web service, version: `cat /app/version.txt` on node `hostname`, mode: ${ENVIRONMENT}"

    # Enable includes based on environment mode
    cp /etc/nginx/templates/*-${ENVIRONMENT}.conf /etc/nginx/includes 2>/dev/null || true

    for envvar in MAIN_RPC_ADDR MAIN_RPC_PORT ROPSTEN_RPC_ADDR ROPSTEN_RPC_PORT; do
        if [ $(eval echo "\$${envvar}") ]; then
            echo "Setting ${envvar} to $(eval echo "\$${envvar}")"
            sed -i -- "s/\[${envvar}\]/$(eval echo "\$${envvar}")/g" /app/js/settings.js
        fi
    done
    echo "Ready"

    /usr/sbin/nginx
fi
