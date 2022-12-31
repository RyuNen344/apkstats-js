import yarn from "danger-plugin-yarn";
import jest from "danger-plugin-jest";

// @ts-ignore
const coverage = require("danger-plugin-coverage")
const reporter = require("danger-plugin-lint-report")

Promise.all([
  yarn(),
  jest(),
  reporter.scan({
    fileMask: "**/lint-results.xml",
    reportSeverity: true,
    requireLineModification: true,
  }),
  coverage()
]).then(console.log);
