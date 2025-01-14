import { Destroyable } from "../types/destroyable";

export class VideoManager implements Destroyable {
  public isLoading: boolean = false;
  private onLoadingOutputEvent: () => void;
  private onLoadingCompleteOutputEvent: () => void;

  constructor({
    url,
    onLoading,
    onLoadingComplete,
  }: {
    url: string;
    onLoading: () => void;
    onLoadingComplete: () => void;
  }) {
    this.onLoadingOutputEvent = onLoading;
    this.onLoadingCompleteOutputEvent = onLoadingComplete;

    this.handleLoading();

    setTimeout(() => {
      this.handleLoadingComplete();
    }, 1000);
  }

  private handleLoading = () => {
    this.isLoading = true;

    this.onLoadingOutputEvent();
  };

  private handleLoadingComplete = () => {
    this.isLoading = false;

    this.onLoadingCompleteOutputEvent();
  };

  public destroy = () => {};
}
