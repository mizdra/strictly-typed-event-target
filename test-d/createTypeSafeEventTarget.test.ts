import { createTypeSafeEventTarget, TypeSafeCustomEvent, TypeSafeEventTarget } from '../src';
import { FooEventMap, expectType } from './helper';

const [FooCustomEvent, FooEventTarget] = createTypeSafeEventTarget<FooEventMap>();

// *************************
// *** compatibility
// *************************

expectType<typeof FooCustomEvent, TypeSafeCustomEvent<FooEventMap>>();
expectType<typeof FooEventTarget, TypeSafeEventTarget<FooEventMap>>();

// *************************
// *** call
// *************************

createTypeSafeEventTarget<FooEventMap>();
createTypeSafeEventTarget<{}>();
// @ts-expect-error
createTypeSafeEventTarget<void>();
