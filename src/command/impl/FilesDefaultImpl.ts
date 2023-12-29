import Files from "@/command/files";
import Executor from "@/executor/executor";
import {FilesListOption} from "@/types/FilesListOption";

export class FilesDefaultImpl implements Files {
  readonly path: string;
  readonly executor: Executor;

  constructor(path: string, executor: Executor) {
    this.path = path;
    this.executor = executor;
  }

  list(option?: FilesListOption[]): string[] {
    let command = `apkanalyzer files list "${this.path}"`;
    if (option !== null) {
      option
        ?.filter((x, i, self) => self.findIndex(y => y.kind === x.kind) === i)
        ?.forEach((e) => command += ` ${e.kind}`)
    }

    return this.executor
      .execute(command)
      .split("\n")
      .filter(value => value.length > 0)
  }

  cat(path: string): [string] {
    throw new Error(`Method not implemented. ${path}`);
  }
}
