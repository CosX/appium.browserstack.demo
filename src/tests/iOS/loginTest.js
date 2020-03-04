
import assert from 'assert';
export async function execute(driver, asserters, capabilities){
    await driver.init({...capabilities, name: 'Login test'});

    const emailfield = await driver.waitForElementById('emailLoginTextField', asserters.isDisplayed, 10000, 100);
    await emailfield.sendKeys('tester@gmail.com');

    const passwordfield = await driver.waitForElementById('passwordLoginTextField', asserters.isDisplayed, 10000, 100);
    await passwordfield.sendKeys('test');

    const loginButton = await driver.waitForElementById('confirmLoginButton', asserters.isDisplayed, 10000, 100);
    await driver.tapElement(loginButton);

    assert(true);
    driver.quit();
}