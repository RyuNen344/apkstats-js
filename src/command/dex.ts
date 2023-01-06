import ClassTree from "@/types/ClassTree";
import { DexPackagesOption } from "@/types/DexPackagesOption";

export default interface Dex {
  list(): [string];

  references(files?: [string]): Map<string, number>;

  packages(option?: DexPackagesOption): [ClassTree];

  code(clazz: string, method?: string): string;
}
