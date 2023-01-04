import {ApkCompareOption} from "@/types/ApkCompareOption";
import Feature from "@/types/Feature";
import ApkInfo from "@/types/ApkInfo";

export default interface Apk {
  summary(): ApkInfo

  fileSize(): number

  downloadSize(): number

  features(notRequired: boolean): Feature[]

  compare(other: string, option: ApkCompareOption): any
}
