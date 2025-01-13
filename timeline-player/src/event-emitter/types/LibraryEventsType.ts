import { studioEvents } from "../events";

export interface LibraryEventsType {
  [studioEvents.timeline.library.addVideo]: AddVideoPayload;
}

export interface AddVideoPayload {
  url: string;
}
