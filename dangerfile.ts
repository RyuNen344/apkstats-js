// @ts-ignore
import coverage from "danger-plugin-coverage";
// @ts-ignore
import reporter from 'danger-plugin-lint-report';
import yarn from "danger-plugin-yarn";
import jest from "danger-plugin-jest";
import {schedule} from "danger";

schedule(
  Promise.all([
    yarn(),
    jest(),
    reporter.scan({
      fileMask: "**/lint-results.xml",
      reportSeverity: true,
      requireLineModification: true,
    }),
    coverage()
  ])
);
