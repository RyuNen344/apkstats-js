export default class ClassTree {
  type: ClassTreeType;
  status: ClassTreeStatus;
  definedMethodCount: number;
  referencedMethodCount: number;
  byteSize: number;
  name: string;

  constructor(
    type: ClassTreeType,
    status: ClassTreeStatus,
    definedMethodCount: number,
    referencedMethodCount: number,
    byteSize: number,
    name: string,
  ) {
    this.type = type;
    this.status = status;
    this.definedMethodCount = definedMethodCount;
    this.referencedMethodCount = referencedMethodCount;
    this.byteSize = byteSize;
    this.name = name;
  }
}

export const enum ClassTreeType {
  Package = "Package",
  Class = "Class",
  Method = "Method",
  Field = "Field",
}

export const enum ClassTreeStatus {
  Execute = "Execute",
  Keep = "Keep",
  Reference = "Reference",
  Define = "Define",
}
