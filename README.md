# type-safe-event-target

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

## How to dev

- `yarn run start`: Run for production
- `yarn run build`: Build for production
- `yarn run dev`: Run for development
- `yarn run check`: Try static-checking
