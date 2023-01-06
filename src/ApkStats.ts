import Apk from "@/command/apk";
import { ApkDefaultImpl } from "@/command/impl/ApkDefaultImpl";
import { exists, isApk } from "@/util/file-util";
import { FileError, FileErrorType } from "@/types/Error";
import Executor from "@/executor/executor";
import ExecutorDefaultImpl from "@/executor/impl/ExecutorDefaultImpl";

export default class ApkStats {
  readonly path: string;
  readonly executor: Executor;
  readonly apk: Apk;

  constructor({ path, executor, apk }: { path: string; executor?: Executor; apk?: Apk }) {
    if (!exists(path)) {
      throw new FileError(FileErrorType.NOT_FOUND);
    }
    if (!isApk(path)) {
      throw new FileError(FileErrorType.INVALID_MIME);
    }

    this.path = path;
    this.executor = executor ?? new ExecutorDefaultImpl();
    this.apk = apk ?? new ApkDefaultImpl(this.path, this.executor);
  }
}
