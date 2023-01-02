import Apk from "@/command/apk";
import {ApkDefaultImpl} from "@/command/impl/ApkDefaultImpl";
import {exists} from "@/util/file-util";

export class ApkStats {
  readonly path: string
  apk: Apk

  constructor({path, apk}: { path: string; apk?: Apk }) {
    if (!exists(path)) {
      throw new Error("")
    }

    this.path = path
    this.apk = apk ?? new ApkDefaultImpl(this.path)
  };
}
