import {ApkCompareOption} from "@/types/ApkCompareOption";

export default interface Apk {
  summary(): string

  fileSize(): number

  downloadSize(): number

  features(notRequired: boolean): [string]

  compare(other: string, option: ApkCompareOption): any
}
