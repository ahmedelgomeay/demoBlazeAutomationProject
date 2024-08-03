import { test, expect, Page, request, BrowserContext } from '@playwright/test';
import { POManager } from '../../page-objects/POManager'
const pagesData =  JSON.parse(JSON.stringify(require('../../utils/test-data/PagesData.json')));
const loginCredentials = JSON.parse(JSON.stringify(require('../../utils/test-data/loginCredentials/LoginCredentials.json')));

let context: BrowserContext;
let token: string;

test.beforeAll(async ({ browser }) => {
  context = await browser.newContext();
});

test.beforeEach('Login with API', async ({ }) => {
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

test('User can logout successfully', { tag: '@WebLogout @WebRegression' }, async ({ }) => {
  const page = await context.newPage();

  await page.goto(pagesData.homepageData.homePageURL);

  const poManager = POManager.getSingleInstance(page);
  const navBar = poManager.getNavBar();
  const homePage = poManager.getHomePage();

  await navBar.logOutButton.click();
  await context.clearCookies();
  await expect(navBar.signUpButton).toBeVisible();
  await expect(navBar.logInButton).toBeVisible();
});

test.afterAll(async ({ }) => {
  await context.close();
});