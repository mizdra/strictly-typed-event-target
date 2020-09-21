export interface STCustomEventInit<T> extends CustomEventInit<T> {
  detail: T;
}

export interface STCustomEvent<EventMap extends {}, EventName extends keyof EventMap = keyof EventMap>
  extends CustomEvent<EventMap[EventName]> {
  new <T extends keyof EventMap>(
    typeArg: T,
    // ref: https://stackoverflow.com/a/52318137
    ...ConditionalOptionalArgs: EventMap[T] extends undefined
      ? [STCustomEventInit<EventMap[T]>?]
      : [STCustomEventInit<EventMap[T]>]
  ): STCustomEvent<EventMap, T>;
}

export interface STEventListener<EventMap extends {}, EventName extends keyof EventMap = keyof EventMap> {
  (evt: STCustomEvent<EventMap, EventName>): void;
}

export interface STEventListenerObject<EventMap extends {}, EventName extends keyof EventMap = keyof EventMap> {
  handleEvent(evt: STCustomEvent<EventMap, EventName>): void;
}

export type STEventListenerOrEventListenerObject<
  EventMap extends {},
  EventName extends keyof EventMap = keyof EventMap
> = STEventListener<EventMap, EventName> | STEventListenerObject<EventMap, EventName>;

export interface STEventTarget<EventMap extends {}> {
  new (): STEventTarget<EventMap>;
  addEventListener<T extends keyof EventMap>(
    type: T,
    listener: STEventListenerOrEventListenerObject<EventMap, T> | null,
    options?: boolean | AddEventListenerOptions,
  ): void;
  dispatchEvent<CustomEvent extends STCustomEvent<EventMap, keyof EventMap>>(event: CustomEvent): boolean;
  removeEventListener<T extends keyof EventMap>(
    type: T,
    callback: STEventListenerOrEventListenerObject<EventMap, T> | null,
    options?: EventListenerOptions | boolean,
  ): void;
}

export function createSTEventTarget<EventMap extends {}>() {
  const STCustomEvent = (CustomEvent as unknown) as STCustomEvent<EventMap>;
  const STEventTarget = EventTarget as STEventTarget<EventMap>;
  return [STCustomEvent, STEventTarget] as const;
}
