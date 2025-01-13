import { Destroy } from "../types/destroy";
import { Video } from "../Video/Video";

export class VideoTrack implements Destroy {
  private videos: Video[] = [];
  private onLoadingEvent: () => void;
  private onLoadingCompleteEvent: () => void;

  constructor({
    onLoading,
    onLoadingComplete,
  }: {
    onLoading: () => void;
    onLoadingComplete: () => void;
  }) {
    this.onLoadingEvent = onLoading;
    this.onLoadingCompleteEvent = onLoadingComplete;
  }

  public addVideo = ({ url }: { url: string }) => {
    this.videos.push(
      new Video({
        url,
        onLoading: this.handleLoadingVideo,
        onLoadingComplete: this.handleLoadingVideoComplete,
      })
    );
  };

  private handleLoadingVideo = () => {
    this.onLoadingEvent();
  };

  private handleLoadingVideoComplete = () => {
    this.onLoadingCompleteEvent();
  };

  public destroy = () => {
    this.videos.forEach((video) => video.destroy());
    this.videos = [];
  };
}
