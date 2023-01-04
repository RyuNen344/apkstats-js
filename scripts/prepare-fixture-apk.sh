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
  run ./gradlew assemble -q
}

# cleanup
go_to_repo_root
info "cleanup build artifact"
run rm -rf "$_FIXTURE_APP_ROOT_ABS_PATH_/app/build"
run rm -rf ./test/__resource__/builds/*.apk

cd "$_FIXTURE_APP_ROOT_ABS_PATH_"

# build fixture apks
declare -a apk_build_types=("normal" "feature")
for name in "${apk_build_types[@]}"; do
  info "build $name apks"
  replace_manifest "$name"
  run copy_apk "$_DEBUG_APK_OUTPUT_PATH_" "app-$name-debug.apk"
  run copy_apk "$_RELEASE_APK_OUTPUT_PATH_" "app-$name-release.apk"
done

# reset git
run git reset --hard
