import { execSync } from "child_process";
import ExecutorDefaultImpl from "@/executor/impl/ExecutorDefaultImpl";

jest.mock("child_process");

describe("test default executor", () => {
  it("execute should call child process", () => {
    (execSync as jest.Mock).mockImplementationOnce(() => "ok");
    const executor = new ExecutorDefaultImpl();
    const actual = executor.execute("args");

    expect(execSync).toHaveBeenCalledWith("args");
    expect(actual).toBe("ok");
  });
});
