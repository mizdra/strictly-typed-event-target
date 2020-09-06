# @mizdra/type-safe-event-target

![](<https://img.badgesize.io/https:/unpkg.com/@mizdra/type-safe-event-target/dist/esm/index.js.svg?compression=gzip&label=esm%20size%20(without%20minify)>) ![](<https://img.badgesize.io/https:/unpkg.com/@mizdra/type-safe-event-target/dist/umd/index.js.svg?compression=gzip&label=umd%20size%20(without%20minify)>)

This is a type-safe version of [`EventTarget`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget).

## Motivation

Traditionally, there was no universal native event emitter for browsers and Node.js. Therefore, if you wanted a universal event emitter that worked in both environments, you had to use a 3rd-party library like [`eventemitter3`](https://github.com/primus/eventemitter3). However, recently, Node.js has implemented [`EventTarget`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget) (An experimental feature not yet available to the public as of 2020/09), `EventTarget` is establishing itself as a universal event emitter.

Because `EventTarget` is a native API, it's faster and smaller than a 3rd party library like `eventemitter3` (rather than needing an extra bundle!). However, `EventTarget` cannot restrict the types of events it dispatches like `eventemitter3`. This has the problem of dispatching events of an unexpected type, which can cause runtime errors.

Therefore, `@mizdra/type-safe-event-target` provides `EventTarget`, which can restrict the types of events to be dispatched. It's based on `EventTarget` and [`CustomEvent`](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent), so it's very fast and very small in size.

## Feature

- Based on [`EventTarget`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget) and [`CustomEvent`](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent)
- Type-safe API
- Universal (works on Browser and Node.js (in the near future...))
- High performance
- Veeeeeeeeeeeeeeery small size (Size of esm version is 1XX B !!!)

## Install

```console
$ npm install -S @mizdra/type-safe-event-target
$ yarn add @mizdra/type-safe-event-target
```

## Usage

```typescript
import { createTypeSafeEventTarget, TypeSafeEventListenerOrEventListenerObject } from '@mizdra/type-safe-event-target';

// First, you should define event for `EventTarget`.
interface FooEventMap {
  // `onmessage` is event name, and `string` is type of `CustomEvent#detail`.
  onmessage: string;
  onerror: Error;
}

const [FooCustomEvent, FooEventTarget] = createTypeSafeEventTarget<FooEventMap>();
const fooEventTarget = new FooEventTarget();
fooEventTarget.addEventListener('onmessage', (event) => {
  // `event.detail` is infered `string`.
  console.log(event.detail);
});
fooEventTarget.dispatchEvent(new FooCustomEvent('onmessage', { detail: 'hello' }));

// Listener type is also available.
const listener: TypeSafeEventListenerOrEventListenerObject<FooEventMap, 'onmessage'> = () => {
  throw new Error('Removed event listener must not be called.');
};
fooEventTarget.addEventListener('onmessage', listener);
fooEventTarget.removeEventListener('onmessage', listener);
fooEventTarget.dispatchEvent(new FooCustomEvent('onmessage', { detail: 'hello' }));
```

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
