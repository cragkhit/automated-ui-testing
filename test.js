const { Builder, Browser, By, Key, until } = require('selenium-webdriver')
 
;(async function open_mdn() {
  let driver = await new Builder().forBrowser(Browser.CHROME).build()
  try {
    await driver.get('https://developer.mozilla.org/en-US/')
  } finally {
    await driver.quit()
  }
})()

const assert = require("assert");
;(async function search() {
  let driver = await new Builder().forBrowser(Browser.CHROME).build()
  try {
    await driver.get('https://developer.mozilla.org/en-US/')
    await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN)
    await driver.wait(until.titleIs('WebDriver | MDN'), 1000)
    // Check page title
    const pageTitle = await driver.getTitle();
    await assert.strictEqual(pageTitle, 'WebDriver | MDN');
  } finally {
    await driver.quit()
  }
})()

