#!/usr/bin/env bash
set -euo pipefail

. "$(git rev-parse --show-toplevel)/scripts/utilities"

checking_command() {
  local -r cmd="$1"

  sleep 1

  if type "$cmd" >/dev/null 2>&1; then
    info "$_CHECK_MARK_ ${_ESCAPE_}[32m$cmd${_ESCAPE_}[m is found"
    return 0
  elif type "$cmd.bat" >/dev/null 2>&1; then
    info "$_CHECK_MARK_ ${_ESCAPE_}[32m$cmd${_ESCAPE_}[m is found"
    return 0
  else
    warn "$_WARNING_ ${_ESCAPE_}[33m$cmd${_ESCAPE_}[m is not found"
    return 1
  fi
}

go_to_repo_root
declare -a missing_required_components=()
info 'check command...'

if ! checking_command 'npm'; then
  missing_required_components+=('npm')
  warn "Please install NPM"
fi

if ! checking_command 'yarn'; then
  missing_required_components+=('yarn')
  warn "Please install NPM"
fi

if ! checking_command 'java'; then
  missing_required_components+=('java')
  warn "Please install JDK and export it to PATH"
fi

if ! checking_command 'apkanalyzer'; then
  missing_required_components+=('apkanalyzer')
  warn "Please install cmdline-tools and export it to PATH from https://developer.android.com/studio/command-line"
fi

sleep 1

if ((0 < ${#missing_required_components[@]})); then
  err '---------'
  err "${missing_required_components[*]} are required. Please install them to complete setup."
  fatal '---------'
fi

info "Found all required commands. ${_TADA_}"
