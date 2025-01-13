import { studioEvents } from "../../event-emitter/events";

export const incomingMessageTypes = {
  ...studioEvents,
  initCanvas: "INIT_CANVAS",
  destroy: "DESTROY",
} as const;

export const outcomingMessageTypes = {
  onLoading: "ON_LOADING",
  onLoadingComplete: "ON_LOADING_COMPLETE",
  onError: "ON_ERROR",
} as const;
