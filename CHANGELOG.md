<a name="unreleased"></a>

## [Unreleased]

<a name="v2.0.0"></a>

## [v2.0.0] - 2020-09-21

### Build

- use git-chglog instead of conventional-changelog-cli

### Docs

- rewrite `type-safe` to `strictly-typed`
- show the size before gzip

### Refactor

- rename type-safe to ST (strictly-typed)

### BREAKING CHANGE

all exported item is renamed

<a name="v1.0.0"></a>

## [v1.0.0] - 2020-09-21

### Chore

- rename package

### Docs

- add CHANGELOG
- `EventTarget` is originally type-safe
- improve information for compatibility
- high performance is false
- add compatibility details

<a name="v0.1.0"></a>

## [v0.1.0] - 2020-09-07

### Chore

- add keyword

### Docs

- improve README
- add motivation
- add size badges

### Feat

- support legacy environment
- allow `eventInitDict` to be omitted if the type of `CustomEvent#detail` is `undefined`

### Fix

- fix type error
- forbidden to assign `undefined` to `detail` field

### Refactor

- rename `test-d` to `test-type`

<a name="v0.0.1"></a>

## v0.0.1 - 2020-09-06

### Build

- improve ci config
- prepare release
- fix deps
- add config for build
- improve tsconfig
- add eslint

### Deps

- bump [@types](https://github.com/types)/node from 14.6.2 to 14.6.4

### Docs

- add usage description

### Feat

- implement

### Test

- ignore test for node because node do not implement `EventTarget` yet
- add test for node
- add test with jest
- fix failed test
- fix implicit any warning
- add npm-script for test
- fix eslint error
- add test for type

### Pull Requests

- Merge pull request [#1](https://github.com/mizdra/strictly-typed-event-target/issues/1) from mizdra/dependabot/npm_and_yarn/types/node-14.6.4

[unreleased]: https://github.com/mizdra/strictly-typed-event-target/compare/v2.0.0...HEAD
[v2.0.0]: https://github.com/mizdra/strictly-typed-event-target/compare/v1.0.0...v2.0.0
[v1.0.0]: https://github.com/mizdra/strictly-typed-event-target/compare/v0.1.0...v1.0.0
[v0.1.0]: https://github.com/mizdra/strictly-typed-event-target/compare/v0.0.1...v0.1.0
