#!/bin/sh -e

RUNMODE="${1:-start}"

echo "Starting server in ${ENV:-undefined} mode"

if [ "$ENV" = "demo" ]; then
    sed -i '/location \/status/i location /storybook { include /etc/nginx/storybook-nginx.conf; }' /etc/nginx/nginx.conf
fi


if [ "${RUNMODE}" = "check" ]; then
    /usr/sbin/nginx -t
else
    echo "Starting jwallet-web service, version: `cat /app/version.txt` on node `hostname`"

    for envvar in MAIN_RPC_ADDR MAIN_RPC_PORT ROPSTEN_RPC_ADDR ROPSTEN_RPC_PORT; do
        if [ $(eval echo "\$${envvar}") ]; then
            echo "Setting ${envvar} to $(eval echo "\$${envvar}")"
            sed -i -- "s/\[${envvar}\]/$(eval echo "\$${envvar}")/g" /app/js/settings.js
        fi
    done
    echo "Ready"

    /usr/sbin/nginx
fi
