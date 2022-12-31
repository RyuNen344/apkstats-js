// @ts-ignore
import coverage from "danger-plugin-coverage";
// @ts-ignore
import reporter from 'danger-plugin-lint-report';
import yarn from "danger-plugin-yarn";
import jest from "danger-plugin-jest";
import {DangerDSLType} from "danger/distribution/dsl/DangerDSL";
import {schedule} from "danger";

declare const danger: DangerDSLType

schedule(async () => {
  if (!danger.github) {
    return
  }
  await yarn();
  await jest();
  await reporter.scan({
    fileMask: "**/lint-results.xml",
    reportSeverity: true,
    requireLineModification: true,
  });
  await coverage();
});
