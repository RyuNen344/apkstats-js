import Apk from "@/command/apk";
import { ApkCompareOption, implementApkCompareOption } from "@/types/ApkCompareOption";
import Executor from "@/executor/executor";
import { exists, isApk } from "@/util/file-util";
import { FileError, FileErrorType } from "@/types/Error";
import ApkInfo from "@/types/ApkInfo";
import Feature from "@/types/Feature";
import { ApkDiff } from "@/types/ApkDiff";

export class ApkDefaultImpl implements Apk {
  readonly path: string;
  readonly executor: Executor;

  constructor(path: string, executor: Executor) {
    this.path = path;
    this.executor = executor;
  }

  summary(): ApkInfo {
    const command = `apkanalyzer apk summary "${this.path}"`;
    const [applicationId, versionCode, versionName] = this.executor.execute(command).split(" ");

    return new ApkInfo(applicationId, parseFloat(versionCode), versionName);
  }

  fileSize(): number {
    const command = `apkanalyzer apk file-size "${this.path}"`;

    return parseFloat(this.executor.execute(command));
  }

  downloadSize(): number {
    const command = `apkanalyzer apk download-size "${this.path}"`;

    return parseFloat(this.executor.execute(command));
  }

  features(notRequired: boolean): Feature[] {
    let command = "apkanalyzer apk -h features";
    if (notRequired) {
      command += " --not-required";
    }
    command += ` "${this.path}"`;

    return this.executor
      .execute(command)
      .replace(/\r\n|\n|\r/g, "\n")
      .split("\n")
      .map((value) => {
        const name = value.substring(0, value.indexOf(" "));
        const desc = value.substring(value.indexOf(" ") + 1);

        return new Feature(name, desc, desc === "not-required");
      });
  }

  compare(other: string, option?: ApkCompareOption): ApkDiff[] {
    if (!exists(other)) {
      throw new FileError(FileErrorType.NOT_FOUND);
    }
    if (!isApk(other)) {
      throw new FileError(FileErrorType.INVALID_MIME);
    }

    let command = "apkanalyzer apk compare";
    if (implementApkCompareOption(option)) {
      command += ` ${option.kind}`;
    }
    command += ` "${this.path}" "${other}"`;

    return this.executor
      .execute(command)
      .replace(/\r\n|\n|\r/g, "\n")
      .split("\n")
      .map((value) => {
        const oldSize = value.substring(0, value.indexOf("\t"));
        const newSize = value.substring(oldSize.length + 1, value.indexOf("\t", oldSize.length + 2));
        const sizeDifference = value.substring(
          oldSize.length + newSize.length + 2,
          value.indexOf("\t", oldSize.length + newSize.length + 4)
        );
        const path = value.substring(oldSize.length + newSize.length + sizeDifference.length + 3);

        return new ApkDiff(parseFloat(oldSize), parseFloat(newSize), parseFloat(sizeDifference), path);
      });
  }
}
