import Apk from "@/command/apk";
import ApkStats from "@/ApkStats";

export * from "@/command/impl/ApkDefaultImpl"
export * from "@/command/apk"
export * from "@/command/dex"
export * from "@/command/files"
export * from "@/command/manifest"
export * from "@/command/resources"
export * from "@/types/ApkCompareOption"
export * from "@/types/ClassTree"
export * from "@/types/DexPackagesOption"
export * from "@/types/ResourceType"
export * from "@/util/file-util"
export * from "@/ApkStats";

export const apkStatus = ({path, apk}: { path: string; apk?: Apk }) => (
  new ApkStats({
    path: path,
    apk: apk
  })
);
