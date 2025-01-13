import { Destroy } from "../types/destroy";

export class Video implements Destroy {
  public isLoading: boolean = false;
  private onLoadingEvent: () => void;
  private onLoadingCompleteEvent: () => void;

  constructor({
    url,
    onLoading,
    onLoadingComplete,
  }: {
    url: string;
    onLoading: () => void;
    onLoadingComplete: () => void;
  }) {
    this.onLoadingEvent = onLoading;
    this.onLoadingCompleteEvent = onLoadingComplete;

    this.handleLoading();

    setTimeout(() => {
      this.handleLoadingComplete();
    }, 1000);
  }

  private handleLoading = () => {
    this.isLoading = true;

    this.onLoadingEvent();
  };

  private handleLoadingComplete = () => {
    this.isLoading = false;

    this.onLoadingCompleteEvent();
  };

  public destroy = () => {};
}
