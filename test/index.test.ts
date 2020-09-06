import { createTypeSafeEventTarget, TypeSafeEventListenerOrEventListenerObject } from '../src';

interface FooEventMap {
  onmessage: string;
  onerror: Error;
}

describe('Intergration Test', () => {
  test('fire event listener after dispatching event', () => {
    const [FooCustomEvent, FooEventTarget] = createTypeSafeEventTarget<FooEventMap>();
    const fooEventTarget = new FooEventTarget();
    fooEventTarget.addEventListener('onmessage', (event) => {
      expect(event.detail).toBe('hello');
    });
    fooEventTarget.dispatchEvent(new FooCustomEvent('onmessage', { detail: 'hello' }));
  });

  test('event listener can be removed', () => {
    const [FooCustomEvent, FooEventTarget] = createTypeSafeEventTarget<FooEventMap>();
    const fooEventTarget = new FooEventTarget();
    const listener: TypeSafeEventListenerOrEventListenerObject<FooEventMap, 'onmessage'> = () => {
      throw new Error('Removed event listener must not be called.');
    };
    fooEventTarget.addEventListener('onmessage', listener);
    fooEventTarget.removeEventListener('onmessage', listener);
    fooEventTarget.dispatchEvent(new FooCustomEvent('onmessage', { detail: 'hello' }));
  });
});
