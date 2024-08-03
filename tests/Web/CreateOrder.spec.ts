import { test, expect, Page, request, BrowserContext } from '@playwright/test';
import { POManager } from '../../page-objects/POManager'
import { TestDataGenerator } from '../../utils/test-data/TestDataGenerator';
const pagesData =  JSON.parse(JSON.stringify(require('../../utils/test-data/PagesData.json')));
const productsData = JSON.parse(JSON.stringify(require('../../utils/test-data/ProductsData.json')));
const loginCredentials = JSON.parse(JSON.stringify(require('../../utils/test-data/loginCredentials/LoginCredentials.json')));

let context: BrowserContext;
let token: string;

test.beforeAll(async ({ browser }) => {
  context = await browser.newContext();
});

test.beforeAll('Login with API', async ({ }) => {
  const apiContext = await request.newContext();
  const loginPayload = { username:loginCredentials.userName, password:loginCredentials.password };
  const apiResponse = await apiContext.post('https://api.demoblaze.com/login', { data:loginPayload });
  expect(apiResponse.status()).toBe(200);
  expect(apiResponse.statusText()).toBe("OK");
  expect(await apiResponse.text()).toContain('Auth_token:')
  const jsonResponse = await apiResponse.json();
  token = jsonResponse.split(":")[1].trim();
  console.log("Token: " + token)
});

test.beforeEach('Add token to cookies', async ({ }) => {
  await context.addCookies([{ name: 'tokenp_', value: token, url: pagesData.homepageData.homePageURL }]);
});

test('User can create an order for an Apple monitor 24 succesfully', { tag: '@WebCreateOrder @WebRegression'}, async ({ }) => {
    const page = await context.newPage();
  
    await page.goto(pagesData.homepageData.homePageURL);
  
    const poManager = POManager.getSingleInstance(page);
    const navBar = poManager.getNavBar();
    const homePage = poManager.getHomePage();
    const categoriesPage = poManager.getCategoriesPage();
    const productsPage = poManager.getProductsPage();
    const placeOrderDialog = poManager.getPlaceOrderDialog();
    const testDataGenerator = TestDataGenerator.getSingleInstance();
    const productPrice = productsData.Monitors.AppleMonitor24.price;

    await homePage.monitorsButton.click();
    expect(await categoriesPage.appleMonitor24CategoriesPrice.textContent()).toBe("$" + productPrice);
    await categoriesPage.appleMointor24Item.click();
    expect(await categoriesPage.appleMonitor24ProductDetailPrice.textContent()).toContain(productPrice);
    await categoriesPage.addToCartButton.click();
    page.on('dialog', async dialog => {
        const expectedMessage: string = 'Product added.';
        console.log(await dialog.message());
        expect(await dialog.message()).toEqual(expectedMessage);
        await dialog.accept(); 
    });
    await navBar.cartButton.click();
    await productsPage.placeOrderButton.click();
    await page.waitForLoadState('networkidle');
    await expect(productsPage.orderTotalText).toHaveText("Total: " + productPrice);
    await page.waitForLoadState('networkidle');
    await expect(placeOrderDialog.nameTextField).toBeVisible();
    await placeOrderDialog.nameTextField.fill(testDataGenerator.getUserName());
    await placeOrderDialog.countryTextField.fill(testDataGenerator.getCountry());
    await placeOrderDialog.cityTextField.fill(testDataGenerator.getCity());
    await placeOrderDialog.creditCardTextField.fill(testDataGenerator.getCreditCard());
    await placeOrderDialog.monthTextField.fill(testDataGenerator.getMonth());
    await placeOrderDialog.yearTextField.fill(testDataGenerator.getYear());
    await placeOrderDialog.purchaseButton.click();
    await expect(placeOrderDialog.sucessConfirmationText).toHaveText("Thank you for your purchase!");
    const orderDetailsText = await placeOrderDialog.orderDetails.evaluateAll(
      list => list.map(element => element.textContent));

    const orderAmount = placeOrderDialog.getOrderAmount(orderDetailsText)
    expect(orderAmount).toBe(productPrice);
  });


test.afterAll(async ({ }) => {
    await context.close();
  });