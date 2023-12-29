import { FilesListOption } from "@/types/FilesListOption";

export default interface Files {
  list(option?: FilesListOption[]): string[];

  cat(path: string): [string];
}
