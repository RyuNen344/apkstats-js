export class FileError extends Error {
  readonly type: FileErrorType

  constructor(type: FileErrorType) {
    super();
    this.type = type;
  }
}

export const enum FileErrorType {
  NOT_FOUND = "NOT_FOUND",
  INVALID_MIME = "INVALID_MIME",
}
