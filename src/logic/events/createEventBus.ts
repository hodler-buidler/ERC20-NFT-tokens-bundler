import mitt from 'mitt';

export interface EventBus<EventsMap> {
  trigger: <K extends keyof EventsMap>(eventName: K, payload: EventsMap[K]) => void;
  subscribe: <K extends keyof EventsMap>(
    eventName: K,
    callbackFunc: (payload: EventsMap[K]) => void,
  ) => void;
  unsubscribe: <K extends keyof EventsMap>(
    eventName: K,
    callbackFunc: (payload: EventsMap[K]) => void,
  ) => void;
}

export function createEventBus<EventsMap>(): EventBus<EventsMap> {
  const emitter = mitt();

  return Object.freeze({
    trigger(eventName: unknown, payload: unknown) {
      if (typeof eventName === 'string') {
        emitter.emit(eventName, payload);
      }
    },
    subscribe(eventName: unknown, callbackFunc: unknown) {
      if (typeof eventName === 'string') {
        /* @ts-ignore */
        emitter.on(eventName, callbackFunc);
      }
    },
    unsubscribe(eventName: unknown, callbackFunc: unknown) {
      if (typeof eventName === 'string') {
        /* @ts-ignore */
        emitter.off(eventName, callbackFunc);
      }
    },
  });
}
