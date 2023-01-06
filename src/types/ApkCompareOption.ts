export interface ApkCompareOptionDifferentOnly {
  kind: "--different-only"
}

export interface ApkCompareOptionFilesOnly {
  kind: "--files-only"
}

export interface ApkCompareOptionPatchSize {
  kind: "--patch-size"
}

export type ApkCompareOption =
  ApkCompareOptionDifferentOnly
  | ApkCompareOptionFilesOnly
  | ApkCompareOptionPatchSize

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function implementApkCompareOption(arg: any): arg is ApkCompareOption {
  return arg != null &&
    typeof arg === "object" &&
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    typeof arg.kind === "string"
}
