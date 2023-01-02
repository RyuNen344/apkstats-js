import fs from "fs";

export const exists = (path: string) => {
  try {
    return fs.lstatSync(path).isFile();
  } catch (e) {
    return false;
  }
};
