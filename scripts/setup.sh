#!/usr/bin/env bash
set -euo pipefail

. "$(git rev-parse --show-toplevel)/scripts/utilities"

go_to_repo_root

run sh "scripts/doctor.sh"
run yarn install
run sh "scripts/prepare-fixture-apk.sh"
run sh "scripts/prepare-fixture-output.sh"
