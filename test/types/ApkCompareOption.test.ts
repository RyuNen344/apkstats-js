import {implementApkCompareOption} from "@/types/ApkCompareOption";

describe("test user type guard", () => {
  it('given undefined then returns false', () => {
    expect(implementApkCompareOption(undefined)).toBe(false)
  });
  it('given null then returns false ', () => {
    expect(implementApkCompareOption(undefined)).toBe(false)
  });
  it('given undefined empty interface then returns false ', () => {
    expect(implementApkCompareOption({})).toBe(false)
  });
  it('given undefined empty interface then returns false ', () => {
    expect(implementApkCompareOption({string: "hogehoge"})).toBe(false)
  });
  it('given ApkCompareOptionDifferentOnly then returns false ', () => {
    expect(implementApkCompareOption({kind: "--different-only"})).toBe(true)
  });
  it('given ApkCompareOptionFilesOnly then returns false ', () => {
    expect(implementApkCompareOption({kind: "--files-only"})).toBe(true)
  });
  it('given ApkCompareOptionPatchSize then returns false ', () => {
    expect(implementApkCompareOption({kind: "--patch-size"})).toBe(true)
  });
})
