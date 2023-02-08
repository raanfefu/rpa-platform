#!/usr/bin/env bash
set -e

# Run an individual test suite if the TEST_SUITE environmental variable is set.
if [ -z "$TEST_SUITE" ]; then
    TEST_SUITE=""
fi

CMD="robot -d /robot/results /robot/scripts/nohuman.robot"

echo ${CMD}

eval $CMD