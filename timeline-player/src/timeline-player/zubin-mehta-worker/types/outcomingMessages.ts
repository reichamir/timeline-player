import { outcomingMessageTypes } from "../constants";
import { ErrorPayload } from "./outcomingMessagesPayload";

export interface OutcomingMessages {
  [outcomingMessageTypes.onLoading]: void;
  [outcomingMessageTypes.onLoadingComplete]: void;
  [outcomingMessageTypes.onError]: ErrorPayload;
}
