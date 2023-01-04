import {apkStatus} from "@/index";
import Executor from "@/executor/executor";
import ApkInfo from "@/types/ApkInfo";
import Feature from "@/types/Feature";

describe("ApkDefaultImpl test", () => {
  it("test summary", () => {
    const executeMock = jest.fn().mockReturnValue("com.ryunen344.fixture 1 1.0.0");
    const MockExecutor = jest.fn<Executor, []>().mockImplementation(() => ({
      execute: executeMock
    }));

    const status = apkStatus({
      path: "test/__resource__/empty.apk",
      executor: new MockExecutor()
    })
    const actual = status.apk.summary()

    expect(executeMock).toBeCalledWith("apkanalyzer apk summary test/__resource__/empty.apk")
    expect(executeMock).toBeCalledTimes(1);
    expect(actual).toStrictEqual(new ApkInfo("com.ryunen344.fixture", 1, "1.0.0"))
  })

  it("test fileSize", () => {
    const executeMock = jest.fn().mockReturnValue("32453241");
    const MockExecutor = jest.fn<Executor, []>().mockImplementation(() => ({
      execute: executeMock
    }));

    const status = apkStatus({
      path: "test/__resource__/empty.apk",
      executor: new MockExecutor()
    })
    const actual = status.apk.fileSize()

    expect(executeMock).toBeCalledWith("apkanalyzer apk file-size test/__resource__/empty.apk")
    expect(executeMock).toBeCalledTimes(1);
    expect(actual).toBe(32453241)
  })

  it("test downloadSize", () => {
    const executeMock = jest.fn().mockReturnValue("32453241");
    const MockExecutor = jest.fn<Executor, []>().mockImplementation(() => ({
      execute: executeMock
    }));

    const status = apkStatus({
      path: "test/__resource__/empty.apk",
      executor: new MockExecutor()
    })
    const actual = status.apk.downloadSize()

    expect(executeMock).toBeCalledWith("apkanalyzer apk download-size test/__resource__/empty.apk")
    expect(executeMock).toBeCalledTimes(1);
    expect(actual).toBe(32453241)
  })

  describe("test features", () => {
    it("given not required false", () => {
      const executeMock = jest.fn().mockReturnValue("android.hardware.faketouch implied: default feature for all apps");
      const MockExecutor = jest.fn<Executor, []>().mockImplementation(() => ({
        execute: executeMock
      }));

      const status = apkStatus({
        path: "test/__resource__/empty.apk",
        executor: new MockExecutor()
      })
      const actual = status.apk.features(false)

      expect(executeMock).toBeCalledWith("apkanalyzer apk -h features test/__resource__/empty.apk")
      expect(executeMock).toBeCalledTimes(1);
      expect(actual).toStrictEqual([new Feature("android.hardware.faketouch", "implied: default feature for all apps", false)])
    })

    it("given not required true", () => {
      const executeMock = jest.fn().mockReturnValue("android.hardware.faketouch implied: default feature for all apps\nandroid.hardware.camera not-required");
      const MockExecutor = jest.fn<Executor, []>().mockImplementation(() => ({
        execute: executeMock
      }));

      const status = apkStatus({
        path: "test/__resource__/empty.apk",
        executor: new MockExecutor()
      })
      const actual = status.apk.features(true)

      expect(executeMock).toBeCalledWith("apkanalyzer apk -h features --not-required test/__resource__/empty.apk")
      expect(executeMock).toBeCalledTimes(1);
      expect(actual).toStrictEqual([
        new Feature("android.hardware.faketouch", "implied: default feature for all apps", false),
        new Feature("android.hardware.camera", "not-required", true)
      ])
    })

    it("given windows linebreak", () => {
      const executeMock = jest.fn().mockReturnValue("android.hardware.faketouch implied: default feature for all apps\tandroid.hardware.camera not-required");
      const MockExecutor = jest.fn<Executor, []>().mockImplementation(() => ({
        execute: executeMock
      }));

      const status = apkStatus({
        path: "test/__resource__/empty.apk",
        executor: new MockExecutor()
      })
      const actual = status.apk.features(true)

      expect(executeMock).toBeCalledWith("apkanalyzer apk -h features --not-required test/__resource__/empty.apk")
      expect(executeMock).toBeCalledTimes(1);
      expect(actual).toStrictEqual([
        new Feature("android.hardware.faketouch", "implied: default feature for all apps", false),
        new Feature("android.hardware.camera", "not-required", true)
      ])
    })

  })

})
