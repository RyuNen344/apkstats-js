import { exists, isApk } from "@/util/file-util";

describe("test file utils exists", () => {
  it("given valid file path then returns true", () => {
    expect(exists("test/__resource__/empty.apk")).toBe(true);
  });

  it("given directory path then returns false", () => {
    expect(exists("test/__resource__")).toBe(false);
  });

  it("given vacuity file path then returns false", () => {
    expect(exists("test/__resource__/vacuity")).toBe(false);
  });
});

describe("test file utils isApk", () => {
  it("given valid file path then returns true", () => {
    expect(isApk("test/__resource__/empty.apk")).toBe(true);
  });

  it("given invalid file path then returns false", () => {
    expect(isApk("test/__resource__/empty")).toBe(false);
  });

  it("given directory path then returns false", () => {
    expect(isApk("test/__resource__")).toBe(false);
  });

  it("given vacuity file path then returns false", () => {
    expect(isApk("test/__resource__/vacuity")).toBe(false);
  });
});
