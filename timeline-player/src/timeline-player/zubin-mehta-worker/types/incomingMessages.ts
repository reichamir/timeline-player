import { StudioEventsType } from "../../../event-emitter/types/StudioEventsType";
import { incomingMessageTypes } from "../constants";
import { InitCanvasPayload } from "./incomingMessagesPayload";

export interface IncomingMessages extends StudioEventsType {
  [incomingMessageTypes.initCanvas]: InitCanvasPayload;
  [incomingMessageTypes.destroy]: void;
}
