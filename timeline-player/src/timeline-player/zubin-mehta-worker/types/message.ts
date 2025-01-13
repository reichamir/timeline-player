export type Message<T> = {
  [K in keyof T]: {
    type: K;
    payload: T[K];
  };
}[keyof T];
