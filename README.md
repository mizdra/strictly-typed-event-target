# @mizdra/strictly-typed-event-target

![](<https://img.badgesize.io/https:/unpkg.com/@mizdra/strictly-typed-event-target/dist/esm/index.js.svg?compression=gzip&label=esm%20size%20(without%20minify)>) ![](<https://img.badgesize.io/https:/unpkg.com/@mizdra/strictly-typed-event-target/dist/umd/index.js.svg?compression=gzip&label=umd%20size%20(without%20minify)>)

This is a type-safe version of [`EventTarget`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget).

## Motivation

Traditionally, there was no universal native event emitter for browsers and Node.js. Therefore, if you wanted a universal event emitter that worked in both environments, you had to use a 3rd-party library like [`eventemitter3`](https://github.com/primus/eventemitter3). However, recently, Node.js has implemented [`EventTarget`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget) (An experimental feature not yet available to the public as of 2020/09), `EventTarget` is establishing itself as a universal event emitter.

Because `EventTarget` is a native API, it's smaller than a 3rd party library like `eventemitter3` (rather than needing an extra bundle!). However, `EventTarget` cannot restrict the types of events it dispatches like `eventemitter3`. This has the problem of dispatching events of an unexpected type, which can cause runtime errors.

Therefore, `@mizdra/strictly-typed-event-target` provides `EventTarget`, which can restrict the types of events to be dispatched. It's based on `EventTarget` and [`CustomEvent`](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent), so it's very small in size.

## Feature

- Based on [`EventTarget`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget) and [`CustomEvent`](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent)
- Type-safe API
  - Restrict the types of events to dispatch with `EventMap`.
- Universal
  - Work in the browser/Node.js in the future (**NOTE: not supported in some environments yet**)
- Standardized API
  - `EventTarget` and `CustomEvent` are standardized by WHATWG (ref: [spec](https://dom.spec.whatwg.org/#interface-eventtarget))
- VERY VERY small size
  - **_ES Module version size is 1XX B._** (ref: [source](https://unpkg.com/@mizdra/strictly-typed-event-target/dist/esm/index.js))

## Install

```console
$ npm install -S @mizdra/strictly-typed-event-target
$ yarn add @mizdra/strictly-typed-event-target
```

## Usage

<!-- prettier-ignore-start -->
```typescript
import { createTypeSafeEventTarget } from '@mizdra/strictly-typed-event-target';

// First, you should define event for `EventTarget`.
interface FooEventMap {
  // `onmessage` is event name, and `string` is type of `CustomEvent#detail`.
  onmessage: string;
  onerror: Error;
  oninstall: undefined;
}

// `createTypeSafeEventTarget` is a utility for creating
// type-safe `CustomEvent` and `EventTarget`.
const [FooCustomEvent, FooEventTarget] = createTypeSafeEventTarget<FooEventMap>();
const fooEventTarget = new FooEventTarget();

// `addEventListener`
fooEventTarget.addEventListener('onmessage', (event) => {
  // `event.detail` is infered `string` type.
});
fooEventTarget.addEventListener('onerror', (event) => {
  // `event.detail` is infered `Error` type.
});

// `dispatchEvent`
fooEventTarget.dispatchEvent(
  new FooCustomEvent('onmessage', { detail: 'hello' })
);
// compile error
fooEventTarget.dispatchEvent(
  new FooCustomEvent('onmessage', { detail: new Error() }),
);
fooEventTarget.dispatchEvent(new FooCustomEvent('oninstall'));

// `removeEventListener`
const listener: TypeSafeEventListenerOrEventListenerObject<
  FooEventMap,
  'onmessage',
> = () => {};
fooEventTarget.addEventListener('onmessage', listener);
fooEventTarget.removeEventListener('onmessage', listener);
```
<!-- prettier-ignore-end -->

## APIs

ref: [src/index.ts](https://github.com/mizdra/strictly-typed-event-target/blob/master/src/index.ts)

## Compatibility

Apart from the type definition, [they are identical to `EventTarget` `CustomEvent`](https://github.com/mizdra/strictly-typed-event-target/blob/master/src/index.ts), so the compatibility with them is the same. See MDN or Node.js API Documents for details.

- Browser
  - `EventTarget`: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget#Browser_compatibility
  - `CustomEvent`: https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent#Browser_compatibility
- Node.js
  - `EventTarget`: https://nodejs.org/api/events.html#events_eventtarget_and_event_api
  - `CustomEvent`: not implemented yet

## How to develop (for Contributor)

- `yarn run start`: Run for production
- `yarn run build`: Build for production
- `yarn run dev`: Run for development
- `yarn run check`: Try static-checking

## How to release (for Contributor)

```console
$ # Wait for passing CI...
$ git switch master
$ git pull
$ yarn version
$ npm run build
$ npm publish
$ git push --follow-tags
```
