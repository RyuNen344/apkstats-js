import ApkStats from "@/ApkStats";

describe("FilesDefaultImpl test", () => {
  it("given customized executor impl then set customized impl", () => {
    const stats = new ApkStats({
      path: "test/__resource__/builds/app-feature-release.apk",
    });
    stats.files
      .list([{ kind: "--raw-size" }, { kind: "--files-only" }, { kind: "--download-size" }])
      .forEach((i) => console.log(i));
  });
});
