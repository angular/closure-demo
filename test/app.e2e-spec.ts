import {browser, by, element} from 'protractor';

describe('E2E Tests', function() {
  it('should display: Hello world!', function() {
    browser.get('');
    const div = element(by.css('div'));
    div.getText().then(t => expect(t).toEqual(`Hello World`));
    element(by.css('input')).sendKeys('!');
    div.getText().then(t => expect(t).toEqual(`Hello World!`));
  });
});
