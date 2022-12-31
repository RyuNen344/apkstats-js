export default interface Apk {
  summary(): string

  fileSize(): number

  downloadSize(): number

  features(notRequired: boolean): [string]

  compare(other: any, option: CompareOption): any
}

export enum CompareOption {
  None = "None",
  DifferentOnly = "DifferentOnly",
  FilesOnly = "FilesOnly",
  PatchSize = "PatchSize"
}
