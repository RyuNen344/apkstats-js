import yarn from "danger-plugin-yarn";
import jest from "danger-plugin-jest";
import {DangerDSLType} from "danger/distribution/dsl/DangerDSL";

declare const danger: DangerDSLType
export default async () => {
  if (!danger.github) {
    return
  }

  await yarn();
  await jest();
}
