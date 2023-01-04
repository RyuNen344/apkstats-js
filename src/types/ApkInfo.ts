export type ApplicationId = string
export type VersionCode = number
export type VersionName = string

export default class ApkInfo {
  applicationId: ApplicationId
  versionCode: VersionCode

  versionName: VersionName

  constructor(
    applicationId: ApplicationId,
    versionCode: VersionCode,
    versionName: VersionName
  ) {
    this.applicationId = applicationId
    this.versionCode = versionCode
    this.versionName = versionName
  }
}
