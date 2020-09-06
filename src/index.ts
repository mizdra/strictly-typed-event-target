export interface TypeSafeCustomEventInit<T> extends CustomEventInit<T> {
  detail: T;
}

export interface TypeSafeCustomEvent<EventMap extends {}, EventName extends keyof EventMap = keyof EventMap>
  extends CustomEvent<EventMap[EventName]> {
  new <T extends keyof EventMap>(typeArg: T, eventInitDict: TypeSafeCustomEventInit<EventMap[T]>): TypeSafeCustomEvent<
    EventMap,
    T
  >;
}

export interface TypeSafeEventListener<EventMap extends {}, EventName extends keyof EventMap = keyof EventMap> {
  (evt: TypeSafeCustomEvent<EventMap, EventName>): void;
}

export interface TypeSafeEventListenerObject<EventMap extends {}, EventName extends keyof EventMap = keyof EventMap> {
  handleEvent(evt: TypeSafeCustomEvent<EventMap, EventName>): void;
}

export type TypeSafeEventListenerOrEventListenerObject<
  EventMap extends {},
  EventName extends keyof EventMap = keyof EventMap
> = TypeSafeEventListener<EventMap, EventName> | TypeSafeEventListenerObject<EventMap, EventName>;

export interface TypeSafeEventTarget<EventMap extends {}> {
  new (): TypeSafeEventTarget<EventMap>;
  addEventListener<T extends keyof EventMap>(
    type: T,
    listener: TypeSafeEventListenerOrEventListenerObject<EventMap, T> | null,
    options?: boolean | AddEventListenerOptions,
  ): void;
  dispatchEvent<CustomEvent extends TypeSafeCustomEvent<EventMap, keyof EventMap>>(event: CustomEvent): boolean;
  removeEventListener<T extends keyof EventMap>(
    type: T,
    callback: TypeSafeEventListenerOrEventListenerObject<EventMap, T> | null,
    options?: EventListenerOptions | boolean,
  ): void;
}

export function createTypeSafeEventTarget<EventMap extends {}>() {
  const TypeSafeCustomEvent = CustomEvent as TypeSafeCustomEvent<EventMap>;
  const TypeSafeEventTarget = EventTarget as TypeSafeEventTarget<EventMap>;
  return [TypeSafeCustomEvent, TypeSafeEventTarget] as const;
}
