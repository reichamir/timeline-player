import { createContext } from "react";
import { StudioEventsType } from "../event-emitter/types/StudioEventsType";
import EventEmitter from "../event-emitter/EventEmmiter";

interface StudioContextType {
  eventEmitter: EventEmitter<StudioEventsType>;
}

export const StudioContext = createContext<StudioContextType>(
  {} as StudioContextType
);
