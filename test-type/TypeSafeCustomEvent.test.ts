import { canInstantiate, FooEventMap, canAssign } from './helper';
import { TypeSafeCustomEvent } from '../src';

declare const FooCustomEvent: TypeSafeCustomEvent<FooEventMap>;

// *************************
// *** instantiation
// *************************

canInstantiate<TypeSafeCustomEvent<FooEventMap>>();
canInstantiate<TypeSafeCustomEvent<FooEventMap, 'onmessage'>>();
canInstantiate<TypeSafeCustomEvent<FooEventMap, 'onerror'>>();
// @ts-expect-error
canInstantiate<TypeSafeCustomEvent<FooEventMap, 'invalid-event'>>();
canInstantiate<TypeSafeCustomEvent<{}>>();
// @ts-expect-error
canInstantiate<TypeSafeCustomEvent<void>>();

// *************************
// *** compatibility
// *************************

canAssign<TypeSafeCustomEvent<FooEventMap>, TypeSafeCustomEvent<FooEventMap, 'onmessage'>>();
// @ts-expect-error
canAssign<TypeSafeCustomEvent<FooEventMap, 'onmessage'>, TypeSafeCustomEvent<FooEventMap>>();
canAssign<CustomEvent<FooEventMap[keyof FooEventMap]>, TypeSafeCustomEvent<FooEventMap>>();

// *************************
// *** method
// *************************

new FooCustomEvent('onmessage', { detail: 'hello' });
// @ts-expect-error
new FooCustomEvent('onmessage', { detail: 0 });
// @ts-expect-error
new FooCustomEvent('onmessage', { detail: new Error() });
// @ts-expect-error
new FooCustomEvent('onmessage', { detail: undefined });
// @ts-expect-error
new FooCustomEvent('onmessage');
new FooCustomEvent('oninstall', { detail: undefined });
// TODO: allow `eventInitDict` to be omitted if the type of `CustomEvent#detail` is `undefined`
// @ts-expect-error
new FooCustomEvent('oninstall');
// @ts-expect-error
new FooCustomEvent('invalid-event', {} as any);
