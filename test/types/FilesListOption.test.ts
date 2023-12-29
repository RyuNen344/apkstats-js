import {implementFilesListOption} from "@/types/FilesListOption";

describe("test user type guard", () => {
  it("given undefined then returns false", () => {
    expect(implementFilesListOption(undefined)).toBe(false);
  });
  it("given null then returns false ", () => {
    expect(implementFilesListOption(undefined)).toBe(false);
  });
  it("given undefined empty interface then returns false ", () => {
    expect(implementFilesListOption({})).toBe(false);
  });
  it("given undefined empty interface then returns false ", () => {
    expect(implementFilesListOption({string: "hogehoge"})).toBe(false);
  });
  it("given ApkCompareOptionDifferentOnly then returns false ", () => {
    expect(implementFilesListOption({kind: "--download-size"})).toBe(true);
  });
  it("given ApkCompareOptionFilesOnly then returns false ", () => {
    expect(implementFilesListOption({kind: "--files-only"})).toBe(true);
  });
  it("given ApkCompareOptionPatchSize then returns false ", () => {
    expect(implementFilesListOption({kind: "--raw-size"})).toBe(true);
  });
});
