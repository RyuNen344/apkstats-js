import Executor from "@/executor/executor";
import child_process from "child_process";

export default class ExecutorDefaultImpl implements Executor {
  execute(command: string): string {
    return child_process.execSync(command).toString('utf8')
  }
}
