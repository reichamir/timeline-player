import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { StudioContext } from "../context/StudioContext";
import { studioEvents } from "../event-emitter/events";
import ZubinMehtaWorker from "./zubin-mehta-worker/zubinMehtaWorker?worker";
import {
  incomingMessageTypes,
  outcomingMessageTypes,
} from "./zubin-mehta-worker/constants";
import { Message } from "./zubin-mehta-worker/types/message";
import { IncomingMessages } from "./zubin-mehta-worker/types/incomingMessages";
import { OutcomingMessages } from "./zubin-mehta-worker/types/outcomingMessages";
import { StudioEventsType } from "../event-emitter/types/StudioEventsType";

export function TimelinePlayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const zubinMehtaWorkerRef = useRef(new ZubinMehtaWorker());
  const { eventEmitter } = useContext(StudioContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  zubinMehtaWorkerRef.current.onmessage = (
    e: MessageEvent<Message<OutcomingMessages>>
  ) => {
    const { type, payload } = e.data;

    switch (type) {
      case outcomingMessageTypes.onLoading: {
        setIsLoading(true);
        break;
      }
      case outcomingMessageTypes.onLoadingComplete: {
        setIsLoading(false);
        break;
      }
      case outcomingMessageTypes.onError: {
        console.error(payload);
        setIsError(true);
        break;
      }
    }
  };

  const initCanvas = useCallback(() => {
    const offscreenCanvas = canvasRef.current!.transferControlToOffscreen();

    const message: Message<IncomingMessages> = {
      type: incomingMessageTypes.initCanvas,
      payload: {
        canvas: offscreenCanvas,
      },
    };
    zubinMehtaWorkerRef.current.postMessage(message, [offscreenCanvas]);
  }, [canvasRef, zubinMehtaWorkerRef]);

  const forwardEventToZubinMehta = useCallback(
    (args: {
      payload: StudioEventsType[keyof StudioEventsType];
      eventName: keyof StudioEventsType;
    }) => {
      const message: Message<IncomingMessages> = {
        type: args.eventName,
        payload: args.payload,
      };

      zubinMehtaWorkerRef.current.postMessage(message);
    },
    [zubinMehtaWorkerRef]
  );

  const addStudioEventsListeners = useCallback(() => {
    eventEmitter.on(
      studioEvents.timeline.library.addVideo,
      forwardEventToZubinMehta
    );
  }, [eventEmitter, forwardEventToZubinMehta]);

  const removeStudioEventsListeners = useCallback(() => {
    eventEmitter.off(
      studioEvents.timeline.library.addVideo,
      forwardEventToZubinMehta
    );
  }, [eventEmitter, forwardEventToZubinMehta]);

  const destroyZubinMehta = useCallback(() => {
    const message: Message<IncomingMessages> = {
      type: incomingMessageTypes.destroy,
      payload: undefined,
    };

    zubinMehtaWorkerRef.current.postMessage(message);
  }, [zubinMehtaWorkerRef]);

  useEffect(() => {
    initCanvas();

    addStudioEventsListeners();

    return () => {
      removeStudioEventsListeners();
      destroyZubinMehta();
    };
  }, [
    eventEmitter,
    addStudioEventsListeners,
    removeStudioEventsListeners,
    initCanvas,
    destroyZubinMehta,
  ]);

  return (
    <div>
      {isError ? (
        <div>Error!</div>
      ) : (
        <>
          {isLoading && <div>Loading...</div>}

          <canvas
            ref={canvasRef}
            width="1280"
            height="720"
            style={{ border: "1px solid white" }}
          ></canvas>
        </>
      )}
    </div>
  );
}
