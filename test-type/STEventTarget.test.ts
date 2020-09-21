import { STCustomEvent, STEventTarget } from '../src/index';
import { FooEventMap, canInstantiate, canAssign, expectType } from './helper';

declare const fooEventTarget: STEventTarget<FooEventMap>;
declare const FooCustomEvent: STCustomEvent<FooEventMap>;

// *************************
// *** instantiation
// *************************
canInstantiate<STEventTarget<FooEventMap>>();
canInstantiate<STEventTarget<{}>>();
// @ts-expect-error
canInstantiate<STEventTarget<void>>();

// *************************
// *** compatibility
// *************************

// NOTE: The follow line expects a type error to occur, but for some reason it doesn't...
canAssign<STEventTarget<{}>, STEventTarget<FooEventMap>>();
canAssign<STEventTarget<FooEventMap>, STEventTarget<{}>>();

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
