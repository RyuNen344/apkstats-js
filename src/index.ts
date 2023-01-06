import Apk from "@/command/apk";
import ApkStats from "@/ApkStats";
import Executor from "@/executor/executor";

export const apkStatus = ({ path, executor, apk }: { path: string; executor?: Executor; apk?: Apk }) =>
  new ApkStats({
    path: path,
    executor: executor,
    apk: apk,
  });
