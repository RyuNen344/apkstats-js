import ApkStats from "@/ApkStats";
import { ApkDefaultImpl } from "@/command/impl/ApkDefaultImpl";
import Apk from "@/command/apk";
import { FileError, FileErrorType } from "@/types/Error";
import ExecutorDefaultImpl from "@/executor/impl/ExecutorDefaultImpl";
import Executor from "@/executor/executor";
import Manifest from "@/command/manifest";
import { ManifestDefaultImpl } from "@/command/impl/ManifestDefaultImpl";

describe("test constructor check", () => {
  it("given valid file path then success", () => {
    expect(
      () =>
        new ApkStats({
          path: "test/__resource__/empty.apk",
        })
    ).not.toThrowError();
  });

  it("given vacuity file path then throws error", () => {
    expect(
      () =>
        new ApkStats({
          path: "test/__resource__/vacuity",
        })
    ).toThrowError(new FileError(FileErrorType.NOT_FOUND));
  });

  it("given invalid mime type file path then throws error", () => {
    expect(
      () =>
        new ApkStats({
          path: "test/__resource__/empty",
        })
    ).toThrowError(new FileError(FileErrorType.INVALID_MIME));
  });
});

describe("test implementation delegate", () => {
  it("given null executor impl then set default impl", () => {
    const stats = new ApkStats({
      path: "test/__resource__/empty.apk",
    });
    expect(stats.executor).toBeInstanceOf(ExecutorDefaultImpl);
  });

  it("given customized executor impl then set customized impl", () => {
    const stats = new ApkStats({
      path: "test/__resource__/empty.apk",
      executor: <Executor>{},
    });
    expect(stats.executor).not.toBeInstanceOf(ExecutorDefaultImpl);
  });

  it("given null apk impl then set default impl ", () => {
    const stats = new ApkStats({
      path: "test/__resource__/empty.apk",
    });
    expect(stats.apk).toBeInstanceOf(ApkDefaultImpl);
  });

  it("given customized apk impl then set customized impl", () => {
    const stats = new ApkStats({
      path: "test/__resource__/empty.apk",
      apk: <Apk>{},
    });
    expect(stats.apk).not.toBeInstanceOf(ApkDefaultImpl);
  });

  it("given null manifest impl then set default impl ", () => {
    const stats = new ApkStats({
      path: "test/__resource__/empty.apk",
    });
    expect(stats.manifest).toBeInstanceOf(ManifestDefaultImpl);
  });

  it("given customized manifest impl then set customized impl", () => {
    const stats = new ApkStats({
      path: "test/__resource__/empty.apk",
      manifest: <Manifest>{},
    });
    expect(stats.manifest).not.toBeInstanceOf(ManifestDefaultImpl);
  });
});
