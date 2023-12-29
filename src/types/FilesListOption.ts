export interface FilesListOptionDownloadSize {
  kind: "--download-size";
}

export interface FilesListOptionFilesOnly {
  kind: "--files-only";
}

export interface FilesListOptionRawSize {
  kind: "--raw-size";
}

export type FilesListOption = FilesListOptionDownloadSize | FilesListOptionFilesOnly | FilesListOptionRawSize;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function implementFilesListOption(arg: any): arg is FilesListOption {
  return (
    arg != null &&
    typeof arg === "object" &&
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    typeof arg.kind === "string"
  );
}
