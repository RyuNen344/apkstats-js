import {apkStatus} from "@/index";
import Executor from "@/executor/executor";
import ApkInfo from "@/types/ApkInfo";
import Feature from "@/types/Feature";
import {FileError, FileErrorType} from "@/types/Error";
import {ApkDiff} from "@/types/ApkDiff";

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

    expect(executeMock).toBeCalledWith("apkanalyzer apk summary \"test/__resource__/empty.apk\"")
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

    expect(executeMock).toBeCalledWith("apkanalyzer apk file-size \"test/__resource__/empty.apk\"")
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

    expect(executeMock).toBeCalledWith("apkanalyzer apk download-size \"test/__resource__/empty.apk\"")
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

      expect(executeMock).toBeCalledWith("apkanalyzer apk -h features \"test/__resource__/empty.apk\"")
      expect(executeMock).toBeCalledTimes(1);
      expect(actual).toStrictEqual([new Feature("android.hardware.faketouch", "implied: default feature for all apps", false)])
    })

    it("given not required true", () => {
      const executeMock = jest.fn().mockReturnValue("android.hardware.camera not-required");
      const MockExecutor = jest.fn<Executor, []>().mockImplementation(() => ({
        execute: executeMock
      }));

      const status = apkStatus({
        path: "test/__resource__/empty.apk",
        executor: new MockExecutor()
      })
      const actual = status.apk.features(true)

      expect(executeMock).toBeCalledWith("apkanalyzer apk -h features --not-required \"test/__resource__/empty.apk\"")
      expect(executeMock).toBeCalledTimes(1);
      expect(actual).toStrictEqual([
        new Feature("android.hardware.camera", "not-required", true)
      ])
    })

    it("given linebreaks", () => {
      const executeMock = jest.fn().mockReturnValue(
        "crlf linebreaks\r\n" +
        "lf linebreaks\r" +
        "cr linebreaks\n" +
        "last linebreaks"
      );
      const MockExecutor = jest.fn<Executor, []>().mockImplementation(() => ({
        execute: executeMock
      }));

      const status = apkStatus({
        path: "test/__resource__/empty.apk",
        executor: new MockExecutor()
      })
      const actual = status.apk.features(true)

      expect(executeMock).toBeCalledWith("apkanalyzer apk -h features --not-required \"test/__resource__/empty.apk\"")
      expect(executeMock).toBeCalledTimes(1);
      expect(actual).toStrictEqual([
        new Feature("crlf", "linebreaks", false),
        new Feature("lf", "linebreaks", false),
        new Feature("cr", "linebreaks", false),
        new Feature("last", "linebreaks", false),
      ])
    })
  })

  describe("test compare", () => {
    it("given invalid vacuity path of targets for comparison then throws error", () => {
      const status = apkStatus({
        path: "test/__resource__/empty.apk",
        executor: <Executor>{}
      })

      expect(() => {
        status.apk.compare("test/__resource__/vacuity")
      }).toThrowError(new FileError(FileErrorType.NOT_FOUND))
    });

    it("given invalid mime type file path of targets for comparison then throws error", () => {
      const status = apkStatus({
        path: "test/__resource__/empty.apk",
        executor: <Executor>{}
      })

      expect(() => {
        status.apk.compare("test/__resource__/empty")
      }).toThrowError(new FileError(FileErrorType.INVALID_MIME))
    });

    it("given no option", () => {
      const executeMock = jest.fn().mockReturnValue(
        "9363049\t10950174\t1587125\t/\n" +
        "8129560\t9180200\t1050640\t/classes.dex\n" +
        "0\t477340\t477340\t/classes2.dex\n" +
        "827244\t848512\t21268\t/resources.arsc\n" +
        "0\t1704\t1704\t/classes3.dex\n" +
        "3840\t3928\t88\t/AndroidManifest.xml\n" +
        "0\t114144\t114144\t/res/drawable/"
      );
      const MockExecutor = jest.fn<Executor, []>().mockImplementation(() => ({
        execute: executeMock
      }));

      const status = apkStatus({
        path: "test/__resource__/empty.apk",
        executor: new MockExecutor()
      })
      const actual = status.apk.compare("test/__resource__/empty.apk")

      expect(executeMock).toBeCalledWith("apkanalyzer apk compare \"test/__resource__/empty.apk\" \"test/__resource__/empty.apk\"")
      expect(executeMock).toBeCalledTimes(1);
      expect(actual).toStrictEqual([
          new ApkDiff(9363049, 10950174, 1587125, "/"),
          new ApkDiff(8129560, 9180200, 1050640, "/classes.dex"),
          new ApkDiff(0, 477340, 477340, "/classes2.dex"),
          new ApkDiff(827244, 848512, 21268, "/resources.arsc"),
          new ApkDiff(0, 1704, 1704, "/classes3.dex"),
          new ApkDiff(3840, 3928, 88, "/AndroidManifest.xml"),
          new ApkDiff(0, 114144, 114144, "/res/drawable/"),
        ]
      );
    });

    it("given different only option", () => {
      const executeMock = jest.fn().mockReturnValue(
        "9363049\t10950174\t1587125\t/\n" +
        "8129560\t9180200\t1050640\t/classes.dex\n" +
        "0\t477340\t477340\t/classes2.dex\n" +
        "827244\t848512\t21268\t/resources.arsc\n" +
        "0\t1704\t1704\t/classes3.dex\n" +
        "3840\t3928\t88\t/AndroidManifest.xml\n" +
        "0\t114144\t114144\t/res/drawable/"
      );
      const MockExecutor = jest.fn<Executor, []>().mockImplementation(() => ({
        execute: executeMock
      }));

      const status = apkStatus({
        path: "test/__resource__/empty.apk",
        executor: new MockExecutor()
      })
      const actual = status.apk.compare(
        "test/__resource__/empty.apk",
        {kind: "--different-only"}
      )

      expect(executeMock).toBeCalledWith("apkanalyzer apk compare --different-only \"test/__resource__/empty.apk\" \"test/__resource__/empty.apk\"")
      expect(executeMock).toBeCalledTimes(1);
      expect(actual).toStrictEqual([
          new ApkDiff(9363049, 10950174, 1587125, "/"),
          new ApkDiff(8129560, 9180200, 1050640, "/classes.dex"),
          new ApkDiff(0, 477340, 477340, "/classes2.dex"),
          new ApkDiff(827244, 848512, 21268, "/resources.arsc"),
          new ApkDiff(0, 1704, 1704, "/classes3.dex"),
          new ApkDiff(3840, 3928, 88, "/AndroidManifest.xml"),
          new ApkDiff(0, 114144, 114144, "/res/drawable/"),
        ]
      );
    });

    it("given files only option", () => {
      const executeMock = jest.fn().mockReturnValue(
        "9363049\t10950174\t1587125\t/\n" +
        "8129560\t9180200\t1050640\t/classes.dex\n" +
        "0\t477340\t477340\t/classes2.dex\n" +
        "827244\t848512\t21268\t/resources.arsc\n" +
        "0\t1704\t1704\t/classes3.dex\n" +
        "3840\t3928\t88\t/AndroidManifest.xml\n" +
        "0\t114144\t114144\t/res/drawable/"
      );
      const MockExecutor = jest.fn<Executor, []>().mockImplementation(() => ({
        execute: executeMock
      }));

      const status = apkStatus({
        path: "test/__resource__/empty.apk",
        executor: new MockExecutor()
      })
      const actual = status.apk.compare(
        "test/__resource__/empty.apk",
        {kind: "--files-only"}
      )

      expect(executeMock).toBeCalledWith("apkanalyzer apk compare --files-only \"test/__resource__/empty.apk\" \"test/__resource__/empty.apk\"")
      expect(executeMock).toBeCalledTimes(1);
      expect(actual).toStrictEqual([
          new ApkDiff(9363049, 10950174, 1587125, "/"),
          new ApkDiff(8129560, 9180200, 1050640, "/classes.dex"),
          new ApkDiff(0, 477340, 477340, "/classes2.dex"),
          new ApkDiff(827244, 848512, 21268, "/resources.arsc"),
          new ApkDiff(0, 1704, 1704, "/classes3.dex"),
          new ApkDiff(3840, 3928, 88, "/AndroidManifest.xml"),
          new ApkDiff(0, 114144, 114144, "/res/drawable/"),
        ]
      );
    });

    it("given patch size option", () => {
      const executeMock = jest.fn().mockReturnValue(
        "9363049\t10950174\t1587125\t/\n" +
        "8129560\t9180200\t1050640\t/classes.dex\n" +
        "0\t477340\t477340\t/classes2.dex\n" +
        "827244\t848512\t21268\t/resources.arsc\n" +
        "0\t1704\t1704\t/classes3.dex\n" +
        "3840\t3928\t88\t/AndroidManifest.xml\n" +
        "0\t114144\t114144\t/res/drawable/"
      );
      const MockExecutor = jest.fn<Executor, []>().mockImplementation(() => ({
        execute: executeMock
      }));

      const status = apkStatus({
        path: "test/__resource__/empty.apk",
        executor: new MockExecutor()
      })
      const actual = status.apk.compare(
        "test/__resource__/empty.apk",
        {kind: "--patch-size"}
      )

      expect(executeMock).toBeCalledWith("apkanalyzer apk compare --patch-size \"test/__resource__/empty.apk\" \"test/__resource__/empty.apk\"");
      expect(executeMock).toBeCalledTimes(1);
      expect(actual).toStrictEqual([
          new ApkDiff(9363049, 10950174, 1587125, "/"),
          new ApkDiff(8129560, 9180200, 1050640, "/classes.dex"),
          new ApkDiff(0, 477340, 477340, "/classes2.dex"),
          new ApkDiff(827244, 848512, 21268, "/resources.arsc"),
          new ApkDiff(0, 1704, 1704, "/classes3.dex"),
          new ApkDiff(3840, 3928, 88, "/AndroidManifest.xml"),
          new ApkDiff(0, 114144, 114144, "/res/drawable/"),
        ]
      );
    });

    it("given linebreaks", () => {
      const executeMock = jest.fn().mockReturnValue(
        "9363049\t10950174\t1587125\t/\r\n" +
        "8129560\t9180200\t1050640\t/classes.dex\r" +
        "0\t477340\t477340\t/classes2.dex\n" +
        "827244\t848512\t21268\t/resources.arsc\n" +
        "0\t1704\t1704\t/classes3.dex\n" +
        "3840\t3928\t88\t/AndroidManifest.xml\n" +
        "0\t114144\t114144\t/res/drawable/"
      );
      const MockExecutor = jest.fn<Executor, []>().mockImplementation(() => ({
        execute: executeMock
      }));

      const status = apkStatus({
        path: "test/__resource__/empty.apk",
        executor: new MockExecutor()
      })
      const actual = status.apk.compare("test/__resource__/empty.apk")

      expect(executeMock).toBeCalledWith("apkanalyzer apk compare \"test/__resource__/empty.apk\" \"test/__resource__/empty.apk\"")
      expect(executeMock).toBeCalledTimes(1);
      expect(actual).toStrictEqual([
          new ApkDiff(9363049, 10950174, 1587125, "/"),
          new ApkDiff(8129560, 9180200, 1050640, "/classes.dex"),
          new ApkDiff(0, 477340, 477340, "/classes2.dex"),
          new ApkDiff(827244, 848512, 21268, "/resources.arsc"),
          new ApkDiff(0, 1704, 1704, "/classes3.dex"),
          new ApkDiff(3840, 3928, 88, "/AndroidManifest.xml"),
          new ApkDiff(0, 114144, 114144, "/res/drawable/"),
        ]
      );
    });
  })
})
