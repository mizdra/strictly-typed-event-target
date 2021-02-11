/* eslint-disable @typescript-eslint/no-unused-vars */

export interface FooEventMap {
  onmessage: string;
  onerror: Error;
  oninstall: undefined;
}

/** T can be instantiated */
export declare function canInstantiate<T>(): void;

/** U can assign to T (`const T = U`) */
export declare function canAssign<T, U extends T>(): void;

export declare function expectType<T, U extends T>(): void;
