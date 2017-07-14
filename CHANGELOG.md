# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/)


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

### Removed
- Preprocessor no longer sets a default bundle format.

### Fixed
- Test script now uses explicit path to Karma binary.


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

[4.0.0]: https://github.com/jlmakes/karma-rollup-preprocessor/compare/3.0.3...4.0.0
[3.0.3]: https://github.com/jlmakes/karma-rollup-preprocessor/compare/3.0.2...3.0.3
[3.0.2]: https://github.com/jlmakes/karma-rollup-preprocessor/compare/3.0.1...3.0.2
[3.0.1]: https://github.com/jlmakes/karma-rollup-preprocessor/compare/3.0.0...3.0.1
[3.0.0]: https://github.com/jlmakes/karma-rollup-preprocessor/compare/2.0.2...3.0.0
[2.0.2]: https://github.com/jlmakes/karma-rollup-preprocessor/compare/2658714f911bac857be4b2d169ea363d33d85050...2.0.2
[2.0.1]: https://github.com/jlmakes/karma-rollup-preprocessor/compare/2.0.0...2658714f911bac857be4b2d169ea363d33d85050
[2.0.0]: https://github.com/jlmakes/karma-rollup-preprocessor/compare/1.0.0...2.0.0
[1.0.0]: https://github.com/jlmakes/karma-rollup-preprocessor/tree/1.0.0
