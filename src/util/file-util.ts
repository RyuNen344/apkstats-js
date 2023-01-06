import fs from "fs";
import npath from "path";

export const exists = (path: string) => {
  try {
    return fs.lstatSync(path).isFile();
  } catch (e) {
    return false;
  }
};

export const isApk = (path: string) => {
  return npath.extname(path) === ".apk";
};
