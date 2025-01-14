import { incomingMessageTypes, outcomingMessageTypes } from "./constants";
import { IncomingMessages } from "./types/incomingMessages";
import { Message } from "./types/message";
import { OutcomingMessages } from "./types/outcomingMessages";
import { VideoTrackManager } from "./video-track-manager/VideoTrackManager";

let canvas: OffscreenCanvas;
let videoTracks: VideoTrackManager[] = [];

function init() {
  videoTracks.push(
    new VideoTrackManager({
      onLoading,
      onLoadingComplete,
    })
  );
}

function destroy() {
  videoTracks.forEach((videoTrack) => videoTrack.destroy());
  videoTracks = [];
}

function onLoading() {
  const message: Message<OutcomingMessages> = {
    type: outcomingMessageTypes.onLoading,
    payload: undefined,
  };
  self.postMessage(message);
}

function onLoadingComplete() {
  const message: Message<OutcomingMessages> = {
    type: outcomingMessageTypes.onLoadingComplete,
    payload: undefined,
  };

  self.postMessage(message);
}

function onError(error: Error) {
  const message: Message<OutcomingMessages> = {
    type: outcomingMessageTypes.onError,
    payload: error,
  };

  self.postMessage(message);
}

self.addEventListener(
  "message",
  (e: MessageEvent<Message<IncomingMessages>>) => {
    try {
      const { type, payload } = e.data;

      switch (type) {
        case incomingMessageTypes.timeline.library.addVideo: {
          videoTracks[0].addVideo({ url: payload.url });
          break;
        }
        case incomingMessageTypes.initCanvas: {
          canvas = payload.canvas;
          break;
        }
        case incomingMessageTypes.destroy: {
          destroy();
          break;
        }
      }
    } catch (error: any) {
      onError(error);
    }
  }
);

init();
