#!/usr/bin/env bash
set -euo pipefail

. "$(git rev-parse --show-toplevel)/scripts/utilities"

readonly _FIXTURE_APP_ROOT_ABS_PATH_="$_REPO_ROOT_ABS_PATH_/fixture"
readonly _DEBUG_APK_OUTPUT_PATH_="$_FIXTURE_APP_ROOT_ABS_PATH_/app/build/outputs/apk/debug/app-debug.apk"
readonly _RELEASE_APK_OUTPUT_PATH_="$_FIXTURE_APP_ROOT_ABS_PATH_/app/build/outputs/apk/release/app-release.apk"

copy_apk() {
  cp "$1" "$_REPO_ROOT_ABS_PATH_/test/__resource__/builds/$2"
}

replace_manifest() {
  cp "$_FIXTURE_APP_ROOT_ABS_PATH_/presets/$1.xml" "$_FIXTURE_APP_ROOT_ABS_PATH_/app/src/main/AndroidManifest.xml"
}

go_to_repo_root

# check apks
declare -a apks=($(ls "$_REPO_ROOT_ABS_PATH_/test/__resource__/builds"))
if [ ${#apks[*]} -le 0 ]; then
  err "fixture apks was not found, you need to build apks to prepare resources"
  fatal "you can build with \`prepare-fixture-apk.sh\`"
fi
