#!/usr/bin/env bash
set -e

FILE_NAME_SCRIPT=/robot/scripts/robot-entrypoint.sh

if [ -f ${FILE_NAME_SCRIPT} ]; then
    cat ${FILE_NAME_SCRIPT}
else
    echo "NO ENTRYPOINT SCRIPT FOUND"
    exit -1
fi

eval ${FILE_NAME_SCRIPT}
