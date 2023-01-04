import {ApkCompareOption} from "@/types/ApkCompareOption";
import ApkInfo from "@/types/ApkInfo";

export default interface Apk {
  summary(): ApkInfo

  fileSize(): number

  downloadSize(): number

  features(notRequired: boolean): [string]

  compare(other: string, option: ApkCompareOption): any
}
