# type-safe-event-target

![](<https://img.badgesize.io/https:/unpkg.com/@mizdra/type-safe-event-target/dist/esm/index.js.svg?compression=gzip&label=esm%20size%20(without%20minify)>) ![](<https://img.badgesize.io/https:/unpkg.com/@mizdra/type-safe-event-target/dist/umd/index.js.svg?compression=gzip&label=umd%20size%20(without%20minify)>)

This is a type-safe version of `EventTarget`.

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
