import { useRef } from "react";
import EventEmitter from "./event-emitter/EventEmmiter";
import { StudioEventsType } from "./event-emitter/types/StudioEventsType";
import { TimelinePlayer } from "./timeline-player/TimelinePlayer";
import { StudioContext } from "./context/StudioContext";
import { Library } from "./library/Library";

function App() {
  const eventEmitter = useRef(new EventEmitter<StudioEventsType>());

  return (
    <StudioContext.Provider value={{ eventEmitter: eventEmitter.current }}>
      <div style={{ display: "flex" }}>
        <span style={{ marginRight: "20px" }}>
          <Library></Library>
        </span>
        <span>
          <TimelinePlayer></TimelinePlayer>
        </span>
      </div>
    </StudioContext.Provider>
  );
}

export default App;
