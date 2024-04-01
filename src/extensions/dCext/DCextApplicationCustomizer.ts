import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from '@microsoft/sp-application-base';
import styles from './AppCustomizer.module.scss';
import * as strings from 'DCextApplicationCustomizerStrings';

const LOG_SOURCE: string = 'DCextApplicationCustomizer';

export interface IDCextApplicationCustomizerProperties {
  Top: string;
  Bottom: string;
}

export default class DCextApplicationCustomizer extends BaseApplicationCustomizer<IDCextApplicationCustomizerProperties> {
  private _topPlaceholder: PlaceholderContent | undefined;
  private _bottomPlaceholder: PlaceholderContent | undefined;

  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);
    this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceHolders);
    return Promise.resolve();
  }

  private _renderPlaceHolders(): void {
    if (!this._topPlaceholder) {
      this._topPlaceholder = this.context.placeholderProvider.tryCreateContent(
        PlaceholderName.Top,
        { onDispose: this._onDispose }
      );

      if (this._topPlaceholder) {
        const headerHtml = `
        <div class="topnav">
        <a class="active" href="#home">Home</a>
        <a href="#news">News</a>
        <a href="#contact">Contact</a>
        <a href="#about">About</a>
      </div>`;
        
        this._topPlaceholder.domElement.innerHTML = headerHtml;
      }
    }

    if (!this._bottomPlaceholder) {
      this._bottomPlaceholder = this.context.placeholderProvider.tryCreateContent(
        PlaceholderName.Bottom,
        { onDispose: this._onDispose }
      );

      if (this._bottomPlaceholder) {
        const footerHtml = `
          <div class="${styles.footer}">
            <div class="${styles.container}">
              <div class="${styles.copyright}">
                <p>&copy; 2024 Your Company Name. All rights reserved.</p>
              </div>
              <div class="${styles.socialMedia}">
                <a href="#"><i class="fab fa-facebook-f"></i></a>
                <a href="#"><i class="fab fa-twitter"></i></a>
                <a href="#"><i class="fab fa-linkedin-in"></i></a>
              </div>
            </div>
          </div>`;
        
        this._bottomPlaceholder.domElement.innerHTML = footerHtml;
      }
    }
  }

  private _onDispose(): void {
    console.log('[DCextApplicationCustomizer._onDispose] Disposed custom top and bottom placeholders.');
  }
}
