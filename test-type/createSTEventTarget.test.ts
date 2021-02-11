/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/ban-types */

import { createSTEventTarget, STCustomEvent, STEventTarget } from '../src';
import { FooEventMap, expectType } from './helper';

const [FooCustomEvent, FooEventTarget] = createSTEventTarget<FooEventMap>();

// *************************
// *** compatibility
// *************************

expectType<typeof FooCustomEvent, STCustomEvent<FooEventMap>>();
expectType<typeof FooEventTarget, STEventTarget<FooEventMap>>();

// *************************
// *** call
// *************************

createSTEventTarget<FooEventMap>();
createSTEventTarget<{}>();
// @ts-expect-error
createSTEventTarget<void>();
