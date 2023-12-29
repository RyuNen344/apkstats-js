import Apk from "@/command/apk";
import {ApkDefaultImpl} from "@/command/impl/ApkDefaultImpl";
import {exists, isApk} from "@/util/file-util";
import {FileError, FileErrorType} from "@/types/Error";
import Executor from "@/executor/executor";
import ExecutorDefaultImpl from "@/executor/impl/ExecutorDefaultImpl";
import Manifest from "@/command/manifest";
import {ManifestDefaultImpl} from "@/command/impl/ManifestDefaultImpl";
import Files from "@/command/files";
import {FilesDefaultImpl} from "@/command/impl/FilesDefaultImpl";

export default class ApkStats {
  readonly path: string;
  readonly executor: Executor;
  readonly apk: Apk;
  readonly files: Files;
  readonly manifest: Manifest;

  constructor({
    path,
    executor,
    apk,
    files,
    manifest,
  }: {
    path: string;
    executor?: Executor;
    apk?: Apk;
    files?: Files;
    manifest?: Manifest;
  }) {
    if (!exists(path)) {
      throw new FileError(FileErrorType.NOT_FOUND);
    }
    if (!isApk(path)) {
      throw new FileError(FileErrorType.INVALID_MIME);
    }

    this.path = path;
    this.executor = executor ?? new ExecutorDefaultImpl();
    this.apk = apk ?? new ApkDefaultImpl(this.path, this.executor);
    this.files = files ?? new FilesDefaultImpl(this.path, this.executor);
    this.manifest = manifest ?? new ManifestDefaultImpl(this.path, this.executor);
  }
}
