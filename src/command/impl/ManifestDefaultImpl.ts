import Manifest from "@/command/manifest";
import Executor from "@/executor/executor";
import { xml2js } from "xml-js";
import { ApplicationId, VersionCode, VersionName } from "@/types/ApkInfo";
import { Xml } from "@/types/Manifest";

export class ManifestDefaultImpl implements Manifest {
  readonly path: string;
  readonly executor: Executor;

  constructor(path: string, executor: Executor) {
    this.path = path;
    this.executor = executor;
  }

  print(): Xml {
    const command = `apkanalyzer manifest print "${this.path}"`;
    return xml2js(this.executor.execute(command));
  }

  applicationId(): ApplicationId {
    const command = `apkanalyzer manifest application-id "${this.path}"`;
    return this.executor.execute(command);
  }

  versionName(): VersionName {
    const command = `apkanalyzer manifest version-name "${this.path}"`;
    return this.executor.execute(command);
  }

  versionCode(): VersionCode {
    const command = `apkanalyzer manifest version-code "${this.path}"`;
    return parseFloat(this.executor.execute(command));
  }

  minSdk(): number {
    const command = `apkanalyzer manifest min-sdk "${this.path}"`;
    return parseFloat(this.executor.execute(command));
  }

  targetSdk(): number {
    const command = `apkanalyzer manifest target-sdk "${this.path}"`;
    return parseFloat(this.executor.execute(command));
  }

  permissions(): string[] {
    const command = `apkanalyzer manifest permissions "${this.path}"`;
    return this.executor
      .execute(command)
      .replace(/\r\n|\n|\r/g, "\n")
      .split("\n");
  }

  debuggable(): boolean {
    const command = `apkanalyzer manifest debuggable "${this.path}"`;
    return this.executor.execute(command).toLowerCase() === "true";
  }
}
