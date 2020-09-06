import { TypeSafeCustomEvent, TypeSafeEventTarget } from '../src/index';
import { FooEventMap, canInstantiate, canAssign, expectType } from './helper';

declare const fooEventTarget: TypeSafeEventTarget<FooEventMap>;
declare const FooCustomEvent: TypeSafeCustomEvent<FooEventMap>;

// *************************
// *** instantiation
// *************************
canInstantiate<TypeSafeEventTarget<FooEventMap>>();
canInstantiate<TypeSafeEventTarget<{}>>();
// @ts-expect-error
canInstantiate<TypeSafeEventTarget<void>>();

// *************************
// *** compatibility
// *************************

// @ts-expect-error
canAssign<TypeSafeEventTarget<{}>, TypeSafeEventTarget<FooEventMap>>();
// @ts-expect-error
canAssign<TypeSafeEventTarget<FooEventMap>, TypeSafeEventTarget<{}>>();

// *************************
// *** method
// *************************

fooEventTarget.addEventListener('onmessage', (event) => {
  expectType<typeof event.detail, string>();
});
fooEventTarget.addEventListener('onerror', (event) => {
  expectType<typeof event.detail, Error>();
});
// @ts-expect-error
fooEventTarget.addEventListener('invalid-event', () => {});
fooEventTarget.addEventListener('onmessage', () => {}, { once: true });

fooEventTarget.dispatchEvent(new FooCustomEvent('onmessage', { detail: 'hello' }));
// @ts-expect-error: cannot pass `CustomEvent`
fooEventTarget.dispatchEvent(new CustomEvent('invalid', { detail: 'hello' }));

fooEventTarget.removeEventListener('onmessage', (event) => {
  expectType<typeof event.detail, string>();
});
fooEventTarget.removeEventListener('onerror', (event) => {
  expectType<typeof event.detail, Error>();
});
// @ts-expect-error
fooEventTarget.removeEventListener('invalid-event', () => {});
fooEventTarget.removeEventListener('onmessage', () => {}, { capture: true });
