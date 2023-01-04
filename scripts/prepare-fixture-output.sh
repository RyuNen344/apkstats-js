#!/usr/bin/env bash
set -euo pipefail

. "$(git rev-parse --show-toplevel)/scripts/utilities"

readonly _TEST_RESOURCE_ABS_PATH_="$_REPO_ROOT_ABS_PATH_/test/__resource__"
readonly _TEST_RESOURCE_BUILD_APK_ABS_PATH_="$_TEST_RESOURCE_ABS_PATH_/builds"
readonly _TEST_RESOURCE_REPLAY_ABS_PATH_="$_TEST_RESOURCE_ABS_PATH_/replay"

analyze() {
  if type apkanalyzer >/dev/null 2>&1; then
    apkanalyzer "$@"
  else
    apkanalyzer.bat "$@"
  fi
}

generate_replay() {
  local build_types=("debug" "release")
  for type in "${build_types[@]}"; do
    info "generate $1 $type apkanalyzer result"

    local compareType
    if [ "$type" == "release" ]; then
      compareType="debug"
    else
      compareType="release"
    fi

    # apk
    run analyze apk summary "$_TEST_RESOURCE_BUILD_APK_ABS_PATH_/app-$1-$type.apk" >"$_TEST_RESOURCE_REPLAY_ABS_PATH_/apk-summary-$1-$type"
    run analyze apk file-size "$_TEST_RESOURCE_BUILD_APK_ABS_PATH_/app-$1-$type.apk" >"$_TEST_RESOURCE_REPLAY_ABS_PATH_/apk-file-size-$1-$type"
    run analyze apk download-size "$_TEST_RESOURCE_BUILD_APK_ABS_PATH_/app-$1-$type.apk" >"$_TEST_RESOURCE_REPLAY_ABS_PATH_/apk-download-size-$1-$type"
    run analyze -h apk features "$_TEST_RESOURCE_BUILD_APK_ABS_PATH_/app-$1-$type.apk" >"$_TEST_RESOURCE_REPLAY_ABS_PATH_/apk-features-$1-$type"
    run analyze -h apk features --not-required "$_TEST_RESOURCE_BUILD_APK_ABS_PATH_/app-$1-$type.apk" >"$_TEST_RESOURCE_REPLAY_ABS_PATH_/apk-features-not-required-$1-$type"
    run analyze apk compare "$_TEST_RESOURCE_BUILD_APK_ABS_PATH_/app-$1-$type.apk" "$_TEST_RESOURCE_BUILD_APK_ABS_PATH_/app-$1-$compareType.apk" >"$_TEST_RESOURCE_REPLAY_ABS_PATH_/apk-compare-$1-$type"
    run analyze apk compare --different-only "$_TEST_RESOURCE_BUILD_APK_ABS_PATH_/app-$1-$type.apk" "$_TEST_RESOURCE_BUILD_APK_ABS_PATH_/app-$1-$compareType.apk" >"$_TEST_RESOURCE_REPLAY_ABS_PATH_/apk-compare-different-only-$1-$type"
    run analyze apk compare --files-only "$_TEST_RESOURCE_BUILD_APK_ABS_PATH_/app-$1-$type.apk" "$_TEST_RESOURCE_BUILD_APK_ABS_PATH_/app-$1-$compareType.apk" >"$_TEST_RESOURCE_REPLAY_ABS_PATH_/apk-compare-files-only-$1-$type"
    run analyze apk compare --patch-size "$_TEST_RESOURCE_BUILD_APK_ABS_PATH_/app-$1-$type.apk" "$_TEST_RESOURCE_BUILD_APK_ABS_PATH_/app-$1-$compareType.apk" >"$_TEST_RESOURCE_REPLAY_ABS_PATH_/apk-compare-patch-size-$1-$type"

    # files
    run analyze files list "$_TEST_RESOURCE_BUILD_APK_ABS_PATH_/app-$1-$type.apk" >"$_TEST_RESOURCE_REPLAY_ABS_PATH_/files-list-$1-$type"
    run analyze files cat --file "AndroidManifest.xml" "$_TEST_RESOURCE_BUILD_APK_ABS_PATH_/app-$1-$type.apk" >"$_TEST_RESOURCE_REPLAY_ABS_PATH_/files-cat-$1-$type"

    # manifest
    run analyze manifest print "$_TEST_RESOURCE_BUILD_APK_ABS_PATH_/app-$1-$type.apk" >"$_TEST_RESOURCE_REPLAY_ABS_PATH_/manifest-print-$1-$type.xml"
    run analyze manifest application-id "$_TEST_RESOURCE_BUILD_APK_ABS_PATH_/app-$1-$type.apk" >"$_TEST_RESOURCE_REPLAY_ABS_PATH_/manifest-application-id-$1-$type"
    run analyze manifest version-name "$_TEST_RESOURCE_BUILD_APK_ABS_PATH_/app-$1-$type.apk" >"$_TEST_RESOURCE_REPLAY_ABS_PATH_/manifest-version-name-$1-$type"
    run analyze manifest version-code "$_TEST_RESOURCE_BUILD_APK_ABS_PATH_/app-$1-$type.apk" >"$_TEST_RESOURCE_REPLAY_ABS_PATH_/manifest-version-code-$1-$type"
    run analyze manifest min-sdk "$_TEST_RESOURCE_BUILD_APK_ABS_PATH_/app-$1-$type.apk" >"$_TEST_RESOURCE_REPLAY_ABS_PATH_/manifest-min-sdk-$1-$type"
    run analyze manifest target-sdk "$_TEST_RESOURCE_BUILD_APK_ABS_PATH_/app-$1-$type.apk" >"$_TEST_RESOURCE_REPLAY_ABS_PATH_/manifest-target-sdk-$1-$type"
    run analyze manifest permissions "$_TEST_RESOURCE_BUILD_APK_ABS_PATH_/app-$1-$type.apk" >"$_TEST_RESOURCE_REPLAY_ABS_PATH_/manifest-permissions-$1-$type"
    run analyze manifest debuggable "$_TEST_RESOURCE_BUILD_APK_ABS_PATH_/app-$1-$type.apk" >"$_TEST_RESOURCE_REPLAY_ABS_PATH_/manifest-debuggable-$1-$type"

    # dex
    run analyze dex list "$_TEST_RESOURCE_BUILD_APK_ABS_PATH_/app-$1-$type.apk" >"$_TEST_RESOURCE_REPLAY_ABS_PATH_/dex-list-$1-$type"
    run analyze dex references --files classes.dex "$_TEST_RESOURCE_BUILD_APK_ABS_PATH_/app-$1-$type.apk" >"$_TEST_RESOURCE_REPLAY_ABS_PATH_/dex-references-$1-$type"
    run analyze dex packages "$_TEST_RESOURCE_BUILD_APK_ABS_PATH_/app-$1-$type.apk" >"$_TEST_RESOURCE_REPLAY_ABS_PATH_/dex-packages-$1-$type"
    run analyze dex packages --defined-only "$_TEST_RESOURCE_BUILD_APK_ABS_PATH_/app-$1-$type.apk" >"$_TEST_RESOURCE_REPLAY_ABS_PATH_/dex-packages-defined-only-$1-$type"
    run analyze dex packages --proguard-folder "$_REPO_ROOT_ABS_PATH_/fixture/app" "$_TEST_RESOURCE_BUILD_APK_ABS_PATH_/app-$1-$type.apk" >"$_TEST_RESOURCE_REPLAY_ABS_PATH_/dex-packages-proguard-folder-$1-$type"
    run analyze dex packages --proguard-mappings "$_REPO_ROOT_ABS_PATH_/fixture/app/proguard-rules.pro" "$_TEST_RESOURCE_BUILD_APK_ABS_PATH_/app-$1-$type.apk" >"$_TEST_RESOURCE_REPLAY_ABS_PATH_/dex-packages-proguard-mappings-$1-$type"
    run analyze dex packages --proguard-seeds "$_REPO_ROOT_ABS_PATH_/fixture/app/proguard-rules.pro" "$_TEST_RESOURCE_BUILD_APK_ABS_PATH_/app-$1-$type.apk" >"$_TEST_RESOURCE_REPLAY_ABS_PATH_/dex-packages-proguard-seeds-$1-$type"
    run analyze dex packages --proguard-usages "$_REPO_ROOT_ABS_PATH_/fixture/app/proguard-rules.pro" "$_TEST_RESOURCE_BUILD_APK_ABS_PATH_/app-$1-$type.apk" >"$_TEST_RESOURCE_REPLAY_ABS_PATH_/dex-packages-proguard-usages-$1-$type"
    run analyze dex packages --show-removed "$_TEST_RESOURCE_BUILD_APK_ABS_PATH_/app-$1-$type.apk" >"$_TEST_RESOURCE_REPLAY_ABS_PATH_/dex-packages-show-removed-$1-$type"
    run analyze dex code --class com.ryunen344.fixture.MainActivity "$_TEST_RESOURCE_BUILD_APK_ABS_PATH_/app-$1-$type.apk" >"$_TEST_RESOURCE_REPLAY_ABS_PATH_/dex-code-$1-$type.smali"
    run analyze dex code --class com.ryunen344.fixture.MainActivity --method "onCreate(Landroid/os/Bundle;)V" "$_TEST_RESOURCE_BUILD_APK_ABS_PATH_/app-$1-$type.apk" >"$_TEST_RESOURCE_REPLAY_ABS_PATH_/dex-code-method-$1-$type.smali"

    # resources
    local package="$(analyze resources packages "$_TEST_RESOURCE_BUILD_APK_ABS_PATH_/app-$1-$type.apk")"
    run analyze resources packages "$_TEST_RESOURCE_BUILD_APK_ABS_PATH_/app-$1-$type.apk" >"$_TEST_RESOURCE_REPLAY_ABS_PATH_/resources-packages-$1-$type"
    run analyze resources configs --type drawable "$_TEST_RESOURCE_BUILD_APK_ABS_PATH_/app-$1-$type.apk" >"$_TEST_RESOURCE_REPLAY_ABS_PATH_/resources-configs-$1-$type"
    run analyze resources configs --type drawable --package "$package" "$_TEST_RESOURCE_BUILD_APK_ABS_PATH_/app-$1-$type.apk" >"$_TEST_RESOURCE_REPLAY_ABS_PATH_/resources-configs-package-$1-$type"
    run analyze resources value --config default --name "ic_launcher_background" --type drawable "$_TEST_RESOURCE_BUILD_APK_ABS_PATH_/app-$1-$type.apk" >"$_TEST_RESOURCE_REPLAY_ABS_PATH_/resources-value-$1-$type"
    run analyze resources value --config default --name "ic_launcher_background" --type drawable --package "$package" "$_TEST_RESOURCE_BUILD_APK_ABS_PATH_/app-$1-$type.apk" >"$_TEST_RESOURCE_REPLAY_ABS_PATH_/resources-value-package-$1-$type"
    run analyze resources names --config default --type drawable "$_TEST_RESOURCE_BUILD_APK_ABS_PATH_/app-$1-$type.apk" >"$_TEST_RESOURCE_REPLAY_ABS_PATH_/resources-names-$1-$type"
    run analyze resources names --config default --type drawable --package "$package" "$_TEST_RESOURCE_BUILD_APK_ABS_PATH_/app-$1-$type.apk" >"$_TEST_RESOURCE_REPLAY_ABS_PATH_/resources-names-package-$1-$type"
    run analyze resources xml --file "res/color/m3_text_button_ripple_color_selector.xml" "$_TEST_RESOURCE_BUILD_APK_ABS_PATH_/app-$1-$type.apk" >"$_TEST_RESOURCE_REPLAY_ABS_PATH_/resources-names-package-$1-$type.xml"

  done
}

# cleanup
go_to_repo_root
info "cleanup build artifact"
cd "$_TEST_RESOURCE_REPLAY_ABS_PATH_"
run find . -maxdepth 1 -type f -not -name ".gitkeep" -print0 | xargs -0 rm -rf
go_to_repo_root

# check apks
declare -a apks=("$(ls "$_TEST_RESOURCE_BUILD_APK_ABS_PATH_")")
if [ ${#apks[*]} -le 0 ]; then
  err "fixture apks was not found, you need to build apks to prepare resources"
  fatal "you can build with \`prepare-fixture-apk.sh\`"
fi

# generate file
declare -a apk_build_types=("normal" "feature")
for name in "${apk_build_types[@]}"; do
  generate_replay "$name"
done
