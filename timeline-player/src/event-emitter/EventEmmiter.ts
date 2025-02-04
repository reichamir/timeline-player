// type EventCallback<T = any> = (payload: T) => void;
type EventCallback<T> = (payload: T) => void;

class EventEmitter<TEvents extends Record<string, any>> {
  private events: Map<keyof TEvents, Set<EventCallback<any>>>;

  constructor() {
    this.events = new Map();
  }

  on<K extends keyof TEvents>(
    event: K,
    callback: (args: { payload: TEvents[K]; eventName: K }) => void
  ): void {
    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }

    this.events.get(event)!.add(callback);
  }

  off<K extends keyof TEvents>(
    event: K,
    callback: (args: { payload: TEvents[K]; eventName: K }) => void
  ): void {
    if (!this.events.has(event)) {
      return;
    }

    const listeners = this.events.get(event)!;

    listeners.delete(callback);

    if (listeners.size === 0) {
      this.events.delete(event);
    }
  }

  emit<K extends keyof TEvents>(
    event: K,
    ...args: TEvents[K] extends void ? [] : [TEvents[K]]
  ): void {
    if (!this.events.has(event)) {
      return;
    }

    this.events.get(event)!.forEach((listener) => {
      listener({ payload: args[0] as TEvents[K], eventName: event });
    });
  }
}

export default EventEmitter;
