import { browser, by, element } from 'protractor';

export class AppPage {
<<<<<<< HEAD
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
=======
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getTitleText(): Promise<string> {
>>>>>>> initial commit
    return element(by.css('app-root .content span')).getText() as Promise<string>;
  }
}
