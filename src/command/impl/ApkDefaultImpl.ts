import Apk from "@/command/apk";
import {ApkCompareOption} from "@/types/ApkCompareOption";

export class ApkDefaultImpl implements Apk {
  readonly path: string

  constructor(path: string) {
    this.path = path
  }


  compare(other: any, option: ApkCompareOption): any {
    return ""
  }

  downloadSize(): number {
    return 0;
  }

  features(notRequired: boolean): [string] {
    return [""];
  }

  fileSize(): number {
    return 0;
  }

  summary(): string {
    return "";
  }

}
