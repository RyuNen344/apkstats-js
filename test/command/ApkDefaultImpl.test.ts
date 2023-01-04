import {apkStatus} from "@/index";
import Executor from "@/executor/executor";

describe("ApkDefaultImpl test", () => {
  it("test summary", () => {
    const executeMock = jest.fn().mockReturnValue("mock");
    const MockExecutor = jest.fn<Executor, []>().mockImplementation(() => ({
      execute: executeMock
    }));

    const status = apkStatus({
      path: "test/__resource__/empty.apk",
      executor: new MockExecutor()
    })
    status.apk.summary()

    expect(executeMock).toBeCalledWith("apkanalyzer apk summary test/__resource__/empty.apk")
    expect(executeMock).toBeCalledTimes(1);
  })

})
