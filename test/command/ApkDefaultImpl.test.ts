import {apkStatus} from "@/index";
import Executor from "@/executor/executor";

describe("ApkDefaultImpl test", () => {
  it("test summary", () => {
    const executeMock = jest.fn().mockReturnValue("mock");
    const MockExecutor = jest.fn<Executor, []>().mockImplementation(() => ({
      execute: executeMock
    }));

    const status = apkStatus({
      path: "app-prod-debug.apk",
      executor: new MockExecutor()
    })
    status.apk.summary()
    
    expect(executeMock).toBeCalledWith("apkanalyzer apk summary app-prod-debug.apk")
    expect(executeMock).toBeCalledTimes(1);
  })

})
