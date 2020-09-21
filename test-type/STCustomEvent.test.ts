import { canInstantiate, FooEventMap, canAssign } from './helper';
import { STCustomEvent } from '../src';

declare const FooCustomEvent: STCustomEvent<FooEventMap>;

// *************************
// *** instantiation
// *************************

canInstantiate<STCustomEvent<FooEventMap>>();
canInstantiate<STCustomEvent<FooEventMap, 'onmessage'>>();
canInstantiate<STCustomEvent<FooEventMap, 'onerror'>>();
// @ts-expect-error
canInstantiate<STCustomEvent<FooEventMap, 'invalid-event'>>();
canInstantiate<STCustomEvent<{}>>();
// @ts-expect-error
canInstantiate<STCustomEvent<void>>();

// *************************
// *** compatibility
// *************************

canAssign<STCustomEvent<FooEventMap>, STCustomEvent<FooEventMap, 'onmessage'>>();
// @ts-expect-error
canAssign<STCustomEvent<FooEventMap, 'onmessage'>, STCustomEvent<FooEventMap>>();
canAssign<CustomEvent<FooEventMap[keyof FooEventMap]>, STCustomEvent<FooEventMap>>();

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
new FooCustomEvent('oninstall');
// @ts-expect-error
new FooCustomEvent('invalid-event', {} as any);
