export default interface Manifest {
  print(): Document

  applicationId(): string

  versionName(): string

  versionCode(): string

  minSdk(): number

  targetSdk(): number

  permissions(): [string]

  debuggable(): boolean
}
