# apkstats-js

# :construction: This Tool Is In Development :construction:

This is a wrapper library of [apkanalyzer](https://developer.android.com/studio/command-line/apkanalyzer) for Android projects.

This library allows you to type safe cli operations, and use it to danger or any other automation scripts.

Inspired by [jmatsu/danger-apkstats](https://github.com/jmatsu/danger-apkstats)


## Installation

```shell
yarn add @ryunen344/apkstats-js
```


## Usage

you can create a instance like below
```typescript
const apkStatus = apkStatus({
    path: "path/to/file.apk",
});
```

and call command like below
```typescript
// this scripts means `apkanalyzer apk summary 'path/to/apk'`
apkStatus.apk.summary();
```


## Development

1. Run `git clone git@github.com:RyuNen344/apkstats-js.git`
2. Run `scripts/setup.sh` to check development tools deps
3. Use `yarn test` to run tests
4. Make you changes


## Changelog

See the GitHub [release history](https://github.com/RyuNen344/apkstats-js/releases)


## License

[MIT](./LICENSE)
