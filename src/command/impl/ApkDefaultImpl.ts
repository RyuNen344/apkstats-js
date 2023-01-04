import Apk from "@/command/apk";
import {ApkCompareOption} from "@/types/ApkCompareOption";
import Executor from "@/executor/executor";
import {exists, isApk} from "@/util/file-util";
import {FileError, FileErrorType} from "@/types/Error";

export class ApkDefaultImpl implements Apk {
  readonly path: string
  readonly executor: Executor

  constructor(path: string, executor: Executor) {
    this.path = path
    this.executor = executor
  }


  summary(): string {
    const command = `apkanalyzer apk summary ${this.path}`

    return this.executor.execute(command);
  }


  fileSize(): number {
    const command = `apkanalyzer apk file-size ${this.path}`

    return parseFloat(this.executor.execute(command))
  }

  downloadSize(): number {
    const command = `apkanalyzer apk download-size ${this.path}`

    return parseFloat(this.executor.execute(command))
  }

  features(notRequired: boolean): [string] {
    return [""];
  }

  compare(other: string, option: ApkCompareOption): any {
    if (!exists(other)) {
      throw new FileError(FileErrorType.NOT_FOUND)
    }
    if (!isApk(other)) {
      throw new FileError(FileErrorType.INVALID_MIME)
    }

    return ""
  }
}
