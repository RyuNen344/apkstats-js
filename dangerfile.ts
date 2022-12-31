// @ts-ignore
import coverage from 'danger-plugin-coverage';
import yarn from "danger-plugin-yarn";
import jest from "danger-plugin-jest";
import {DangerDSLType} from "danger/distribution/dsl/DangerDSL";
import {schedule} from "danger";

declare const danger: DangerDSLType

export default async () => {
  if (!danger.github) {
    return
  }
  await yarn();
  await jest();
}
schedule(coverage());
