import Apk from "@/command/apk";
import ApkStats from "@/ApkStats";
import Executor from "@/executor/executor";
import Manifest from "@/command/manifest";

export const apkStatus = ({
  path,
  executor,
  apk,
  manifest,
}: {
  path: string;
  executor?: Executor;
  apk?: Apk;
  manifest?: Manifest;
}) =>
  new ApkStats({
    path: path,
    executor: executor,
    apk: apk,
    manifest: manifest,
  });
