export class ApkDiff {
  readonly oldSize: number
  readonly newSize: number
  readonly sizeDifference: number
  readonly path: string

  constructor(
    oldSize: number,
    newSize: number,
    sizeDifference: number,
    path: string
  ) {
    this.oldSize = oldSize
    this.newSize = newSize
    this.sizeDifference = sizeDifference
    this.path = path
  }
}
