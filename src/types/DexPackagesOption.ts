export interface DexPackagesOptionDefinedOnly {
  kind: "--defined-only";
}

export interface DexPackagesOptionFiles {
  kind: "--files";
}

export interface DexPackagesOptionProguardFolder {
  kind: "--proguard-folder";
  file: string;
}

export interface DexPackagesOptionProguardMappings {
  kind: "--proguard-mappings";
  file: string;
}

export interface DexPackagesOptionProguardSeeds {
  kind: "--proguard-seeds";
  file: string;
}

export interface DexPackagesOptionProguardUsages {
  kind: "--proguard-usages";
  file: string;
}

export interface DexPackagesOptionShowRemoved {
  kind: "--show-removed";
}

export type DexPackagesOption =
  | DexPackagesOptionDefinedOnly
  | DexPackagesOptionFiles
  | DexPackagesOptionProguardFolder
  | DexPackagesOptionProguardMappings
  | DexPackagesOptionProguardSeeds
  | DexPackagesOptionProguardUsages
  | DexPackagesOptionShowRemoved;
