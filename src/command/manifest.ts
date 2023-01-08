import { ApplicationId, VersionCode, VersionName } from "@/types/ApkInfo";
import { Xml } from "@/types/Manifest";

export default interface Manifest {
  /**
   * manifest print
   *
   * Prints the APK manifest in XML format.
   */
  print(): Xml;

  /**
   * manifest application-id
   *
   * Prints the application ID value.
   */
  applicationId(): ApplicationId;

  /**
   * manifest version-name
   *
   * Prints the version name value.
   */
  versionName(): VersionName;

  /**
   * manifest version-code
   *
   * Prints the version code value.
   */
  versionCode(): VersionCode;

  /**
   * manifest min-sdk
   *
   * Prints the minimum SDK version.
   */
  minSdk(): number;

  /**
   * manifest target-sdk
   *
   * Prints the target SDK version.
   */
  targetSdk(): number;

  /**
   * manifest permissions
   *
   * Prints the list of permissions.
   */
  permissions(): string[];

  /**
   * manifest debuggable
   *
   * Prints whether the app is debuggable.
   */
  debuggable(): boolean;
}
