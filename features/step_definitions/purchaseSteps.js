const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { chromium, firefox, webkit } = require('@playwright/test');
const { expect } = require('@playwright/test');

const LoginPage = require('../../pages/loginPage');
const ProductsPage = require('../../pages/productsPage');
const CartPage = require('../../pages/cartPage');
const CheckoutPage = require('../../pages/checkoutPage');

const testData = require('../../testData/testData.json');
const BrowserConfig = require('../../utils/browserConfig');

// Get browser type from environment variable or default to chromium
const getBrowser = () => {
    const browserType = process.env.BROWSER_TYPE || 'chromium';
    switch (browserType.toLowerCase()) {
        case 'firefox':
            return firefox;
        case 'webkit':
            return webkit;
        default:
            return chromium;
    }
};

let browser;
let page;
let loginPage;
let productsPage;
let cartPage;
let checkoutPage;

Before(async () => {
    const browserType = getBrowser();
    const config = BrowserConfig.getConfig();
    browser = await browserType.launch({ 
        headless: process.env.CI ? true : false,
        ...config
    });
    const context = await browser.newContext(BrowserConfig.getContext());
    page = await context.newPage();
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
});

After(async () => {
    await browser.close();
});

Given('I am on the Sauce Demo login page', async () => {
    await loginPage.navigate(testData.url);
});

When('I login with valid credentials', async () => {
    await loginPage.login(testData.credentials.username, testData.credentials.password);
});

When('I add a product to the cart', async () => {
    await productsPage.addFirstProductToCart();
});

When('I open the cart', async () => {
    await productsPage.openCart();
});

When('I proceed to checkout', async () => {
    await cartPage.clickCheckout();
});

When('I enter shipping information', async () => {
    await checkoutPage.fillShippingInfo(
        testData.userInfo.firstName,
        testData.userInfo.lastName,
        testData.userInfo.zipCode
    );
});

When('I click continue', async () => {
    await checkoutPage.clickContinue();
});

When('I click finish', async () => {
    await checkoutPage.clickFinish();
});

Then('I should see the thank you message', async () => {
    const message = await checkoutPage.getThankYouMessage();
    expect(message).toBe(testData.expectedMessage);
});