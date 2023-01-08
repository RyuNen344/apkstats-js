import Executor from "@/executor/executor";
import { apkStatus } from "@/index";

describe("ManifestDefaultImpl test", () => {
  it("test print", () => {
    const executeMock = jest
      .fn()
      .mockReturnValue(
        '<?xml version="1.0" encoding="utf-8"?>\n' +
          "<manifest\n" +
          '  xmlns:android="http://schemas.android.com/apk/res/android"\n' +
          '  android:versionCode="1"\n' +
          '  android:versionName="1.0.0"\n' +
          '  android:compileSdkVersion="33"\n' +
          '  android:compileSdkVersionCodename="13"\n' +
          '  package="com.ryunen344.fixture.debug"\n' +
          '  platformBuildVersionCode="33"\n' +
          '  platformBuildVersionName="13">\n' +
          "\n" +
          "  <uses-sdk\n" +
          '    android:minSdkVersion="28"\n' +
          '    android:targetSdkVersion="33"/>\n' +
          "\n" +
          "  <uses-permission\n" +
          '    android:name="android.permission.CAMERA"/>\n' +
          "\n" +
          "  <uses-feature\n" +
          '    android:name="android.hardware.camera"\n' +
          '    android:required="false"/>\n' +
          "\n" +
          "  <permission\n" +
          '    android:name="com.ryunen344.fixture.debug.DYNAMIC_RECEIVER_NOT_EXPORTED_PERMISSION"\n' +
          '    android:protectionLevel="0x2"/>\n' +
          "\n" +
          "  <uses-permission\n" +
          '    android:name="com.ryunen344.fixture.debug.DYNAMIC_RECEIVER_NOT_EXPORTED_PERMISSION"/>\n' +
          "\n" +
          "  <application\n" +
          '    android:theme="@ref/0x7f100201"\n' +
          '    android:label="@ref/0x7f0f001c"\n' +
          '    android:icon="@ref/0x7f0d0000"\n' +
          '    android:debuggable="true"\n' +
          '    android:allowBackup="true"\n' +
          '    android:supportsRtl="true"\n' +
          '    android:extractNativeLibs="false"\n' +
          '    android:fullBackupContent="@ref/0x7f120000"\n' +
          '    android:roundIcon="@ref/0x7f0d0001"\n' +
          '    android:appComponentFactory="androidx.core.app.CoreComponentFactory"\n' +
          '    android:dataExtractionRules="@ref/0x7f120001">\n' +
          "\n" +
          "    <activity\n" +
          '      android:name="com.ryunen344.fixture.MainActivity"\n' +
          '      android:exported="true">\n' +
          "\n" +
          "      <intent-filter>\n" +
          "\n" +
          "        <action\n" +
          '          android:name="android.intent.action.MAIN"/>\n' +
          "\n" +
          "        <category\n" +
          '          android:name="android.intent.category.LAUNCHER"/>\n' +
          "      </intent-filter>\n" +
          "\n" +
          "      <meta-data\n" +
          '        android:name="android.app.lib_name"\n' +
          '        android:value="@string/0x17"/>\n' +
          "    </activity>\n" +
          "\n" +
          "    <provider\n" +
          '      android:name="androidx.startup.InitializationProvider"\n' +
          '      android:exported="false"\n' +
          '      android:authorities="com.ryunen344.fixture.debug.androidx-startup">\n' +
          "\n" +
          "      <meta-data\n" +
          '        android:name="androidx.emoji2.text.EmojiCompatInitializer"\n' +
          '        android:value="androidx.startup"/>\n' +
          "\n" +
          "      <meta-data\n" +
          '        android:name="androidx.lifecycle.ProcessLifecycleInitializer"\n' +
          '        android:value="androidx.startup"/>\n' +
          "    </provider>\n" +
          "  </application>\n" +
          "</manifest>"
      );
    const MockExecutor = jest.fn<Executor, []>().mockImplementation(() => ({
      execute: executeMock,
    }));

    const status = apkStatus({
      path: "test/__resource__/empty.apk",
      executor: new MockExecutor(),
    });
    const actual = status.manifest.print();

    expect(executeMock).toBeCalledWith('apkanalyzer manifest print "test/__resource__/empty.apk"');
    expect(executeMock).toBeCalledTimes(1);
    expect(actual).toStrictEqual({
      declaration: {
        attributes: {
          encoding: "utf-8",
          version: "1.0",
        },
      },
      elements: [
        {
          attributes: {
            "android:compileSdkVersion": "33",
            "android:compileSdkVersionCodename": "13",
            "android:versionCode": "1",
            "android:versionName": "1.0.0",
            package: "com.ryunen344.fixture.debug",
            platformBuildVersionCode: "33",
            platformBuildVersionName: "13",
            "xmlns:android": "http://schemas.android.com/apk/res/android",
          },
          elements: [
            {
              attributes: {
                "android:minSdkVersion": "28",
                "android:targetSdkVersion": "33",
              },
              name: "uses-sdk",
              type: "element",
            },
            {
              attributes: {
                "android:name": "android.permission.CAMERA",
              },
              name: "uses-permission",
              type: "element",
            },
            {
              attributes: {
                "android:name": "android.hardware.camera",
                "android:required": "false",
              },
              name: "uses-feature",
              type: "element",
            },
            {
              attributes: {
                "android:name": "com.ryunen344.fixture.debug.DYNAMIC_RECEIVER_NOT_EXPORTED_PERMISSION",
                "android:protectionLevel": "0x2",
              },
              name: "permission",
              type: "element",
            },
            {
              attributes: {
                "android:name": "com.ryunen344.fixture.debug.DYNAMIC_RECEIVER_NOT_EXPORTED_PERMISSION",
              },
              name: "uses-permission",
              type: "element",
            },
            {
              attributes: {
                "android:allowBackup": "true",
                "android:appComponentFactory": "androidx.core.app.CoreComponentFactory",
                "android:dataExtractionRules": "@ref/0x7f120001",
                "android:debuggable": "true",
                "android:extractNativeLibs": "false",
                "android:fullBackupContent": "@ref/0x7f120000",
                "android:icon": "@ref/0x7f0d0000",
                "android:label": "@ref/0x7f0f001c",
                "android:roundIcon": "@ref/0x7f0d0001",
                "android:supportsRtl": "true",
                "android:theme": "@ref/0x7f100201",
              },
              elements: [
                {
                  attributes: {
                    "android:exported": "true",
                    "android:name": "com.ryunen344.fixture.MainActivity",
                  },
                  elements: [
                    {
                      elements: [
                        {
                          attributes: {
                            "android:name": "android.intent.action.MAIN",
                          },
                          name: "action",
                          type: "element",
                        },
                        {
                          attributes: {
                            "android:name": "android.intent.category.LAUNCHER",
                          },
                          name: "category",
                          type: "element",
                        },
                      ],
                      name: "intent-filter",
                      type: "element",
                    },
                    {
                      attributes: {
                        "android:name": "android.app.lib_name",
                        "android:value": "@string/0x17",
                      },
                      name: "meta-data",
                      type: "element",
                    },
                  ],
                  name: "activity",
                  type: "element",
                },
                {
                  attributes: {
                    "android:authorities": "com.ryunen344.fixture.debug.androidx-startup",
                    "android:exported": "false",
                    "android:name": "androidx.startup.InitializationProvider",
                  },
                  elements: [
                    {
                      attributes: {
                        "android:name": "androidx.emoji2.text.EmojiCompatInitializer",
                        "android:value": "androidx.startup",
                      },
                      name: "meta-data",
                      type: "element",
                    },
                    {
                      attributes: {
                        "android:name": "androidx.lifecycle.ProcessLifecycleInitializer",
                        "android:value": "androidx.startup",
                      },
                      name: "meta-data",
                      type: "element",
                    },
                  ],
                  name: "provider",
                  type: "element",
                },
              ],
              name: "application",
              type: "element",
            },
          ],
          name: "manifest",
          type: "element",
        },
      ],
    });
  });

  it("test applicationId", () => {
    const executeMock = jest.fn().mockReturnValue("com.ryunen344.fixture");
    const MockExecutor = jest.fn<Executor, []>().mockImplementation(() => ({
      execute: executeMock,
    }));

    const status = apkStatus({
      path: "test/__resource__/empty.apk",
      executor: new MockExecutor(),
    });
    const actual = status.manifest.applicationId();

    expect(executeMock).toBeCalledWith('apkanalyzer manifest application-id "test/__resource__/empty.apk"');
    expect(executeMock).toBeCalledTimes(1);
    expect(actual).toBe("com.ryunen344.fixture");
  });

  it("test versionName", () => {
    const executeMock = jest.fn().mockReturnValue("1.0.0-dev");
    const MockExecutor = jest.fn<Executor, []>().mockImplementation(() => ({
      execute: executeMock,
    }));

    const status = apkStatus({
      path: "test/__resource__/empty.apk",
      executor: new MockExecutor(),
    });
    const actual = status.manifest.versionName();

    expect(executeMock).toBeCalledWith('apkanalyzer manifest version-name "test/__resource__/empty.apk"');
    expect(executeMock).toBeCalledTimes(1);
    expect(actual).toBe("1.0.0-dev");
  });

  it("test versionCode", () => {
    const executeMock = jest.fn().mockReturnValue(34);
    const MockExecutor = jest.fn<Executor, []>().mockImplementation(() => ({
      execute: executeMock,
    }));

    const status = apkStatus({
      path: "test/__resource__/empty.apk",
      executor: new MockExecutor(),
    });
    const actual = status.manifest.versionCode();

    expect(executeMock).toBeCalledWith('apkanalyzer manifest version-code "test/__resource__/empty.apk"');
    expect(executeMock).toBeCalledTimes(1);
    expect(actual).toBe(34);
  });
  it("test minSdk", () => {
    const executeMock = jest.fn().mockReturnValue(29);
    const MockExecutor = jest.fn<Executor, []>().mockImplementation(() => ({
      execute: executeMock,
    }));

    const status = apkStatus({
      path: "test/__resource__/empty.apk",
      executor: new MockExecutor(),
    });
    const actual = status.manifest.minSdk();

    expect(executeMock).toBeCalledWith('apkanalyzer manifest min-sdk "test/__resource__/empty.apk"');
    expect(executeMock).toBeCalledTimes(1);
    expect(actual).toBe(29);
  });
  it("test targetSdk", () => {
    const executeMock = jest.fn().mockReturnValue(33);
    const MockExecutor = jest.fn<Executor, []>().mockImplementation(() => ({
      execute: executeMock,
    }));

    const status = apkStatus({
      path: "test/__resource__/empty.apk",
      executor: new MockExecutor(),
    });
    const actual = status.manifest.targetSdk();

    expect(executeMock).toBeCalledWith('apkanalyzer manifest target-sdk "test/__resource__/empty.apk"');
    expect(executeMock).toBeCalledTimes(1);
    expect(actual).toBe(33);
  });
  describe("test permissions", () => {
    it("should returns lists", () => {
      const executeMock = jest.fn().mockReturnValue("android.permission.CAMERA");
      const MockExecutor = jest.fn<Executor, []>().mockImplementation(() => ({
        execute: executeMock,
      }));

      const status = apkStatus({
        path: "test/__resource__/empty.apk",
        executor: new MockExecutor(),
      });
      const actual = status.manifest.permissions();

      expect(executeMock).toBeCalledWith('apkanalyzer manifest permissions "test/__resource__/empty.apk"');
      expect(executeMock).toBeCalledTimes(1);
      expect(actual).toStrictEqual(["android.permission.CAMERA"]);
    });

    it("given linebreaks", () => {
      const executeMock = jest
        .fn()
        .mockReturnValue(
          "android.permission.CAMERA\n" +
            "android.permission.NETWORK\r\n" +
            "android.permission.WAKE_LOCK\r" +
            "com.ryunen344.fixture.debug.DYNAMIC_RECEIVER_NOT_EXPORTED_PERMISSION"
        );
      const MockExecutor = jest.fn<Executor, []>().mockImplementation(() => ({
        execute: executeMock,
      }));

      const status = apkStatus({
        path: "test/__resource__/empty.apk",
        executor: new MockExecutor(),
      });
      const actual = status.manifest.permissions();

      expect(executeMock).toBeCalledWith('apkanalyzer manifest permissions "test/__resource__/empty.apk"');
      expect(executeMock).toBeCalledTimes(1);
      expect(actual).toStrictEqual([
        "android.permission.CAMERA",
        "android.permission.NETWORK",
        "android.permission.WAKE_LOCK",
        "com.ryunen344.fixture.debug.DYNAMIC_RECEIVER_NOT_EXPORTED_PERMISSION",
      ]);
    });
  });
  it("test debuggable", () => {
    const executeMock = jest.fn().mockReturnValue("false");
    const MockExecutor = jest.fn<Executor, []>().mockImplementation(() => ({
      execute: executeMock,
    }));

    const status = apkStatus({
      path: "test/__resource__/empty.apk",
      executor: new MockExecutor(),
    });
    const actual = status.manifest.debuggable();

    expect(executeMock).toBeCalledWith('apkanalyzer manifest debuggable "test/__resource__/empty.apk"');
    expect(executeMock).toBeCalledTimes(1);
    expect(actual).toBe(false);
  });
});
