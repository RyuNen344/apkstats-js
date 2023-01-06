import { ApkCompareOption } from "@/types/ApkCompareOption";
import Feature from "@/types/Feature";
import ApkInfo from "@/types/ApkInfo";
import { ApkDiff } from "@/types/ApkDiff";

export default interface Apk {
  /**
   * apk summary
   *
   * Prints the application ID, version code, and version name.
   */
  summary(): ApkInfo;

  /**
   * apk file-size
   *
   * Prints the total file size of the APK.
   */
  fileSize(): number;

  /**
   * apk download-size
   *
   * Prints an estimate of the download size of the APK.
   */
  downloadSize(): number;

  /**
   * apk features [--not-required]
   *
   * Prints features used by the APK that trigger Play Store filtering . Add the --not-required option to include features marked as not required in the output.
   *
   * @param notRequired if set true, include not required features
   */
  features(notRequired: boolean): Feature[];

  /**
   * apk compare [options]
   *
   * Compares the sizes
   *
   * @param other targets for comparison apk file path
   * @param option compare option
   */
  compare(other: string, option?: ApkCompareOption): ApkDiff[];
}
