import yarn from "danger-plugin-yarn";
import jest from "danger-plugin-jest";

const coverage = require("danger-plugin-coverage");
const reporter = require("danger-plugin-lint-report");

// noinspection JSVoidFunctionReturnValueUsed
Promise.all([
  yarn(),
  jest(),
  reporter.scan({
    fileMask: "**/lint-results.xml",
    reportSeverity: true,
    requireLineModification: true,
  }),
  coverage(),
]).then(console.log);
