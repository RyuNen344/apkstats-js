import Executor from "@/executor/executor";
import {apkStatus} from "@/index";

describe("FilesDefaultImpl test", () => {
  describe("test files", () => {
    it("given no option", () => {
      const executeMock = jest.fn().mockReturnValue("/\n/META-INF\n/META-INF/androidx.cardview_cardview.version\n");
      const MockExecutor = jest.fn<Executor, []>().mockImplementation(() => ({
        execute: executeMock,
      }));

      const status = apkStatus({
        path: "test/__resource__/empty.apk",
        executor: new MockExecutor(),
      });
      const actual = status.files.list();

      expect(executeMock).toHaveBeenCalledWith('apkanalyzer files list "test/__resource__/empty.apk"');
      expect(executeMock).toHaveBeenCalledTimes(1);
      expect(actual).toStrictEqual(["/", "/META-INF", "/META-INF/androidx.cardview_cardview.version"]);
    });

    it("given download size option", () => {
      const executeMock = jest
        .fn()
        .mockReturnValue("3512554\t/\n12554\t/META-INF\n154\t/META-INF/androidx.cardview_cardview.version\n");
      const MockExecutor = jest.fn<Executor, []>().mockImplementation(() => ({
        execute: executeMock,
      }));

      const status = apkStatus({
        path: "test/__resource__/empty.apk",
        executor: new MockExecutor(),
      });
      const actual = status.files.list([{kind: "--download-size"}]);

      expect(executeMock).toHaveBeenCalledWith('apkanalyzer files list "test/__resource__/empty.apk" --download-size');
      expect(executeMock).toHaveBeenCalledTimes(1);
      expect(actual).toStrictEqual([
        "3512554\t/",
        "12554\t/META-INF",
        "154\t/META-INF/androidx.cardview_cardview.version",
      ]);
    });

    it("given files only option", () => {
      const executeMock = jest.fn().mockReturnValue("/META-INF/androidx.cardview_cardview.version\n");
      const MockExecutor = jest.fn<Executor, []>().mockImplementation(() => ({
        execute: executeMock,
      }));

      const status = apkStatus({
        path: "test/__resource__/empty.apk",
        executor: new MockExecutor(),
      });
      const actual = status.files.list([{kind: "--files-only"}]);

      expect(executeMock).toHaveBeenCalledWith('apkanalyzer files list "test/__resource__/empty.apk" --files-only');
      expect(executeMock).toHaveBeenCalledTimes(1);
      expect(actual).toStrictEqual(["/META-INF/androidx.cardview_cardview.version"]);
    });

    it("given raw size option", () => {
      const executeMock = jest
        .fn()
        .mockReturnValue("3512554\t/\n12554\t/META-INF\n154\t/META-INF/androidx.cardview_cardview.version\n");
      const MockExecutor = jest.fn<Executor, []>().mockImplementation(() => ({
        execute: executeMock,
      }));

      const status = apkStatus({
        path: "test/__resource__/empty.apk",
        executor: new MockExecutor(),
      });
      const actual = status.files.list([{kind: "--raw-size"}]);

      expect(executeMock).toHaveBeenCalledWith('apkanalyzer files list "test/__resource__/empty.apk" --raw-size');
      expect(executeMock).toHaveBeenCalledTimes(1);
      expect(actual).toStrictEqual([
        "3512554\t/",
        "12554\t/META-INF",
        "154\t/META-INF/androidx.cardview_cardview.version",
      ]);
    });

    it("given multiple option", () => {
      const executeMock = jest.fn().mockReturnValue("154\t/META-INF/androidx.cardview_cardview.version\n");
      const MockExecutor = jest.fn<Executor, []>().mockImplementation(() => ({
        execute: executeMock,
      }));

      const status = apkStatus({
        path: "test/__resource__/empty.apk",
        executor: new MockExecutor(),
      });
      const actual = status.files.list([{kind: "--raw-size"}, {kind: "--files-only"}]);

      expect(executeMock).toHaveBeenCalledWith(
        'apkanalyzer files list "test/__resource__/empty.apk" --raw-size --files-only',
      );
      expect(executeMock).toHaveBeenCalledTimes(1);
      expect(actual).toStrictEqual(["154\t/META-INF/androidx.cardview_cardview.version"]);
    });

    it("given same option", () => {
      const executeMock = jest.fn().mockReturnValue("/META-INF/androidx.cardview_cardview.version\n");
      const MockExecutor = jest.fn<Executor, []>().mockImplementation(() => ({
        execute: executeMock,
      }));

      const status = apkStatus({
        path: "test/__resource__/empty.apk",
        executor: new MockExecutor(),
      });
      const actual = status.files.list([{kind: "--files-only"}, {kind: "--files-only"}]);

      expect(executeMock).toHaveBeenCalledWith('apkanalyzer files list "test/__resource__/empty.apk" --files-only');
      expect(executeMock).toHaveBeenCalledTimes(1);
      expect(actual).toStrictEqual(["/META-INF/androidx.cardview_cardview.version"]);
    });
  });
});
