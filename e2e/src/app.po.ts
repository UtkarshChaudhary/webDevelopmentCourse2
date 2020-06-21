import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(link: string) {
    return browser.get(link); // to browse particular link
  }

  getParagraphText(selector: string) {
    return element(by.css(selector)).getText(); //used to obtin inner content of html
  }

  getElement(selector: string){
    return element(by.css(selector));
  }

  getAllElements(selector: string){
    return element.all(by.css(selector));
  }
}
