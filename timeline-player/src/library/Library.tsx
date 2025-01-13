import { useContext } from "react";
import { StudioContext } from "../context/StudioContext";
import { studioEvents } from "../event-emitter/events";

export function Library() {
  const { eventEmitter } = useContext(StudioContext);

  function addClip() {
    eventEmitter.emit(studioEvents.timeline.library.addVideo, {
      url: "https://prod-eus2.clipro.tv/api/clone-playlist/InternalPlaylist.m3u8?stream=streamid=2315822,startindex=1796,endindex=1879,source=0,discoforgap=1,removeduplications=1",
    });
  }

  return (
    <div>
      <button
        onClick={() => {
          addClip();
        }}
      >
        Add clip 1
      </button>
    </div>
  );
}
