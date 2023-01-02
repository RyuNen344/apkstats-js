import {ApkStats} from "@/ApkStats";
import {ApkDefaultImpl} from "@/command/impl/ApkDefaultImpl";
import Apk from "@/command/apk";

describe("test constructor", () => {
  it("given valid file path then success", () => {
    expect(() => new ApkStats({
      path: "hoge"
    })).toThrowError(new Error(""))
  });

  it('given null apk impl then set default impl ', () => {
    const stats = new ApkStats({
      path: ".gitignore",
    })
    expect(stats.apk).toBeInstanceOf(ApkDefaultImpl)
  });

  it("given apk impl then set impl", () => {
    const stats = new ApkStats({
      path: ".gitignore",
      apk: <Apk>{}
    })
    expect(stats.apk).not.toBeInstanceOf(ApkDefaultImpl)
  });
});
