import { Destroyable } from "../types/destroyable";
import { VideoManager } from "../video-manager/VideoManager";

export class VideoTrackManager implements Destroyable {
  private videos: VideoManager[] = [];
  private onLoadingOutputEvent: () => void;
  private onLoadingCompleteOutputEvent: () => void;

  constructor({
    onLoading,
    onLoadingComplete,
  }: {
    onLoading: () => void;
    onLoadingComplete: () => void;
  }) {
    this.onLoadingOutputEvent = onLoading;
    this.onLoadingCompleteOutputEvent = onLoadingComplete;
  }

  public addVideo = ({ url }: { url: string }) => {
    this.videos.push(
      new VideoManager({
        url,
        onLoading: this.handleLoadingVideo,
        onLoadingComplete: this.handleLoadingVideoComplete,
      })
    );
  };

  private handleLoadingVideo = () => {
    this.onLoadingOutputEvent();
  };

  private handleLoadingVideoComplete = () => {
    this.onLoadingCompleteOutputEvent();
  };

  public destroy = () => {
    this.videos.forEach((video) => video.destroy());
    this.videos = [];
  };
}
