import { incomingMessageTypes, outcomingMessageTypes } from "./constants";
import { IncomingMessages } from "./types/incomingMessages";
import { Message } from "./types/message";
import { OutcomingMessages } from "./types/outcomingMessages";
import { VideoTrack } from "./video-track/VideoTrack";

let canvas: OffscreenCanvas;
const videoTracks: VideoTrack[] = [];

function init() {
  videoTracks.push(
    new VideoTrack({
      onLoading,
      onLoadingComplete,
    })
  );
}

function destroy() {
  videoTracks.forEach((videoTrack) => videoTrack.destroy());
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

self.addEventListener(
  "message",
  (e: MessageEvent<Message<IncomingMessages>>) => {
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
  }
);

init();
