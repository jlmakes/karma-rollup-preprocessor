# Change Log

## [7.0.8] - 2022-02-06

### Fixed

- Watcher not working using TypeScript [@YonatanKra](https://github.com/YonatanKra) [#72](https://github.com/jlmakes/karma-rollup-preprocessor/issues/72]

## [7.0.7] - 2021-03-14

### Fixed

- Source map file path regression. [@ntkme](https://github.com/ntkme) [#71](https://github.com/jlmakes/karma-rollup-preprocessor/pull/71)

## [7.0.6] - 2021-02-24

### Fixed

- Source map file paths. [@ntkme](https://github.com/ntkme) [#69](https://github.com/jlmakes/karma-rollup-preprocessor/pull/69)

## [7.0.5] - 2020-03-24

### Fixed

- File path errors on Windows. [@spectras](https://github.com/spectras) [#65](https://github.com/jlmakes/karma-rollup-preprocessor/issues/65) [#66](https://github.com/jlmakes/karma-rollup-preprocessor/issues/65)

## [7.0.4] - 2020-03-22

### Fixed

- Ignore rollup facade modules beginning with a null byte. [@Lalem001](https://github.com/Lalem001) [#62](https://github.com/jlmakes/karma-rollup-preprocessor/issues/62)

## [7.0.3] - 2020-01-16

### Fixed

- Ensure original file path is used for processing [#56](https://github.com/jlmakes/karma-rollup-preprocessor/issues/56)
- Silence Rollup warnings due to invalid output options [#60](https://github.com/jlmakes/karma-rollup-preprocessor/issues/60)

### Added

## [7.0.2] - 2019-07-20

### Fixed

- Regenerate `package-lock.json`

## [7.0.1] - 2019-07-20

### Fixed

- Ensure TypeScript bundle filenames have the correct extension. [@silenceisgolden](https://github.com/silenceisgolden) [#53](https://github.com/jlmakes/karma-rollup-preprocessor/issues/53)

## [7.0.0] - 2019-02-06

### Added

- Support for Rollup `1.0.0` [#42](https://github.com/jlmakes/karma-rollup-preprocessor/issues/42)

### Changed

- **Breaking:** Dropped support for Rollup `< 1.0.0`
- **Breaking:** Dropped support for Node `< 8.0.0`
- Watcher no longer relies on Karma’s `run_start` event. [#41](https://github.com/jlmakes/karma-rollup-preprocessor/issues/41)
- Upgraded dependencies.

### Fixed

- Watcher only rebundles changed files and their dependents. [#28](https://github.com/jlmakes/karma-rollup-preprocessor/issues/28)
- Bundle cache now properly maps each entry to its bundle cache.

## [6.1.2] - 2019-01-02

### Changed

- Constrained Rollup peer dependency to `< 1.0.0`

## [6.1.1] - 2018-11-28

### Fixed

- File watcher no longer crashes on browser reconnect. [@lephyrus](https://github.com/lephyrus) [#40](https://github.com/jlmakes/karma-rollup-preprocessor/pull/40)

## [6.1.0] - 2018-10-17

### Added

- More `info` log output. [@lephyrus](https://github.com/lephyrus) [#39](https://github.com/jlmakes/karma-rollup-preprocessor/pull/39)

### Fixed

- Fix caching memory leak. [@lephyrus](https://github.com/lephyrus) [#38](https://github.com/jlmakes/karma-rollup-preprocessor/pull/38)
- Add generated source map to Karma's file object. [@Lalem001](https://github.com/Lalem001) [#38](https://github.com/jlmakes/karma-rollup-preprocessor/pull/37)

## [6.0.1] - 2018-08-14

### Changed

- Update readme.

## [6.0.0] - 2018-04-29

### Changed

- **Breaking:** Dropped support for Node `< 6.0.0`

## [5.1.1] - 2018-01-08

### Fixed

- Patched `sourcemap` deprecation warning.

## [5.1.0] - 2018-01-08

### Added

- File names containing null bytes are now ignored. [@brianmhunt](https://github.com/brianmhunt) [#30](https://github.com/jlmakes/karma-rollup-preprocessor/issues/30)

## [5.0.3] - 2018-01-05

### Changed

- Upgraded Chokidar dependency.

## [5.0.2] - 2017-11-15

### Changed

- Error logs now show stack traces when possible.

## [5.0.1] - 2017-08-24

### Fixed

- Hotfix peer dependency within Travis CI config (for Node 6).

## [5.0.0] - 2017-08-24

### Changed

- **Breaking:** Rollup 0.47.x and below is no longer supported.
- **Breaking:** Rollup is now a peer dependency.
- **Breaking:** Requires different Karma configuration.

### Fixed

- The file watcher has been re-built stronger, better, and faster. [#17](https://github.com/jlmakes/karma-rollup-preprocessor/issues/17)

## [4.0.4] - 2017-08-22

### Changed

- Is there an echo in here? Update dependency versions. Require Rollup 0.45 – 0.47. [#24](https://github.com/jlmakes/karma-rollup-preprocessor/issues/24)

## [4.0.3] - 2017-08-11

### Changed

- Update dependency versions. Allow Rollup >= v0.45.

## [4.0.2] - 2017-07-30

### Changed

- Update dependency versions. Require Rollup v0.45. [#21](https://github.com/jlmakes/karma-rollup-preprocessor/pull/21)

## [4.0.1] - 2017-07-14

### Fixed

- Refactored Rollup integration for `v0.45`. [@mjeanroy](https://github.com/mjeanroy) [#21](https://github.com/jlmakes/karma-rollup-preprocessor/pull/21)

## [4.0.0] - 2017-04-04

### Added

- Custom preprocessors are now supported. [@mjeanroy](https://github.com/mjeanroy) [#20](https://github.com/jlmakes/karma-rollup-preprocessor/pull/20)

### Changed

- **Breaking:** Dropped support for Node `0.12`.

## [3.0.3] - 2017-01-03

### Changed

- Added callback to `fs.utimes` to silence deprecation warning. [@FezVrasta](https://github.com/FezVrasta) [#18](https://github.com/jlmakes/karma-rollup-preprocessor/pull/18)

## [3.0.2] - 2016-12-29

### Changed

- Updated `rollup-plugin-buble` dev dependency to latest version.

### Fixed

- Add missing comma to example karma configuration.

## [3.0.1] - 2016-12-03

### Fixed

- Revised CHANGELOG grammar for clarity.
- Inconsistent `.eslintrc.json` indentation fixed.
- Update example to exclude `src/` files from browser.

## [3.0.0] - 2016-12-02

A special thanks to [@klaascuvelier](https://github.com/klaascuvelier) who originally authored this repository, and has passed the torch to [@jlmakes](https://github.com/jlmakes) to keep things in tidy working order.

### Added

- File changes now properly re-bundle all watched dependencies. [@brianmhunt](https://github.com/brianmhunt) [#3](https://github.com/jlmakes/karma-rollup-preprocessor/issues/3) [#11](https://github.com/jlmakes/karma-rollup-preprocessor/pull/11)
- Generated bundles are now cached for faster re-bundling. [#10](https://github.com/jlmakes/karma-rollup-preprocessor/issues/10)
- Error log output has been improved for readability.

### Changed

- **Breaking:** The `2.0.0` change that split preprocessor options has been reverted.
- Rollup dependency range changed to anything < `1.0.0`. [#12](https://github.com/jlmakes/karma-rollup-preprocessor/pull/12) [#13](https://github.com/jlmakes/karma-rollup-preprocessor/issues/13)
- Travis CI now tests in Node `0.12`, `4` and `6`.
- Updated `karma-jasmine` to latest major version.

### Fixed

- Test script now uses explicit path to Karma binary.

### Removed

- Preprocessor no longer sets a default bundle format.

## [2.0.2] - 2016-05-13

### Changed

- Rollup dependency version updated. [#9](https://github.com/jlmakes/karma-rollup-preprocessor/pull/9)
- Updated `karma-phantomjs-launcher` to latest major version. [#9](https://github.com/jlmakes/karma-rollup-preprocessor/pull/9)
- Replaced `phantomjs` with `phantomjs-prebuild`. [#9](https://github.com/jlmakes/karma-rollup-preprocessor/pull/9)

### Fixed

- Corrected typo preventing Rollup errors outputting to the karma error log. [#7](https://github.com/jlmakes/karma-rollup-preprocessor/pull/7)

## [2.0.1] - 2016-01-11

### Added

- Rollup errors are now output to the karma error log. [#5](https://github.com/jlmakes/karma-rollup-preprocessor/pull/5)
- Rollup dependency version updated.

## [2.0.0] - 2015-12-14

### Changed

- **Breaking:** Preprocessor options have been split into 2 separate objects, `rollup` and `bundle`.

## [1.0.0] - 2015-12-09

Hello ![heart](http://i.imgur.com/oXJmdtz.gif) World

[7.0.8]: https://github.com/jlmakes/karma-rollup-preprocessor/compare/7.0.7...7.0.8
[7.0.7]: https://github.com/jlmakes/karma-rollup-preprocessor/compare/7.0.6...7.0.7
[7.0.6]: https://github.com/jlmakes/karma-rollup-preprocessor/compare/7.0.5...7.0.6
[7.0.5]: https://github.com/jlmakes/karma-rollup-preprocessor/compare/7.0.4...7.0.5
[7.0.4]: https://github.com/jlmakes/karma-rollup-preprocessor/compare/7.0.3...7.0.4
[7.0.3]: https://github.com/jlmakes/karma-rollup-preprocessor/compare/7.0.2...7.0.3
[7.0.2]: https://github.com/jlmakes/karma-rollup-preprocessor/compare/7.0.1...7.0.2
[7.0.1]: https://github.com/jlmakes/karma-rollup-preprocessor/compare/7.0.0...7.0.1
[7.0.0]: https://github.com/jlmakes/karma-rollup-preprocessor/compare/6.1.2...7.0.0
[6.1.2]: https://github.com/jlmakes/karma-rollup-preprocessor/compare/6.1.1...6.1.2
[6.1.1]: https://github.com/jlmakes/karma-rollup-preprocessor/compare/6.1.0...6.1.1
[6.1.0]: https://github.com/jlmakes/karma-rollup-preprocessor/compare/6.0.1...6.1.0
[6.0.1]: https://github.com/jlmakes/karma-rollup-preprocessor/compare/6.0.0...6.0.1
[6.0.0]: https://github.com/jlmakes/karma-rollup-preprocessor/compare/5.1.1...6.0.0
[5.1.1]: https://github.com/jlmakes/karma-rollup-preprocessor/compare/5.1.0...5.1.1
[5.1.0]: https://github.com/jlmakes/karma-rollup-preprocessor/compare/5.0.3...5.1.0
[5.0.3]: https://github.com/jlmakes/karma-rollup-preprocessor/compare/5.0.2...5.0.3
[5.0.2]: https://github.com/jlmakes/karma-rollup-preprocessor/compare/5.0.1...5.0.2
[5.0.1]: https://github.com/jlmakes/karma-rollup-preprocessor/compare/5.0.0...5.0.1
[5.0.0]: https://github.com/jlmakes/karma-rollup-preprocessor/compare/4.0.3...4.0.4
[4.0.4]: https://github.com/jlmakes/karma-rollup-preprocessor/compare/4.0.2...3.0.3
[4.0.3]: https://github.com/jlmakes/karma-rollup-preprocessor/compare/4.0.1...4.0.2
[4.0.2]: https://github.com/jlmakes/karma-rollup-preprocessor/compare/4.0.0...4.0.1
[4.0.1]: https://github.com/jlmakes/karma-rollup-preprocessor/compare/3.0.3...4.0.0
[4.0.0]: https://github.com/jlmakes/karma-rollup-preprocessor/compare/3.0.3...4.0.0
[3.0.3]: https://github.com/jlmakes/karma-rollup-preprocessor/compare/3.0.2...3.0.3
[3.0.2]: https://github.com/jlmakes/karma-rollup-preprocessor/compare/3.0.1...3.0.2
[3.0.1]: https://github.com/jlmakes/karma-rollup-preprocessor/compare/3.0.0...3.0.1
[3.0.0]: https://github.com/jlmakes/karma-rollup-preprocessor/compare/2.0.2...3.0.0
[2.0.2]: https://github.com/jlmakes/karma-rollup-preprocessor/compare/2658714f911bac857be4b2d169ea363d33d85050...2.0.2
[2.0.1]: https://github.com/jlmakes/karma-rollup-preprocessor/compare/2.0.0...2658714f911bac857be4b2d169ea363d33d85050
[2.0.0]: https://github.com/jlmakes/karma-rollup-preprocessor/compare/1.0.0...2.0.0
[1.0.0]: https://github.com/jlmakes/karma-rollup-preprocessor/tree/1.0.0
