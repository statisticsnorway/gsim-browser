#!/bin/bash
envsubst "`env | awk -F = '{printf \" \$%s\", \$1}'`" < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf
exec nginx -g 'daemon off;'
