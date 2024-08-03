import { test, expect, Page } from '@playwright/test';
import { POManager } from '../../page-objects/POManager'
const pagesData =  JSON.parse(JSON.stringify(require('../../utils/test-data/PagesData.json')));
const loginCredentials = JSON.parse(JSON.stringify(require('../../utils/test-data/loginCredentials/LoginCredentials.json')));

test.beforeEach('Navigate to homepage', async ({ page }) => {
    await page.goto(pagesData.homepageData.homePageURL);
  
  });

test('User could login with valid email and password',{ tag: '@WebLogin @WebRegression' }, async ({ page }) => { 
    const poManager = POManager.getSingleInstance(page);
    const navBar = poManager.getNavBar();
    const loginDialog = poManager.getLoginDialog();
    const userName = loginCredentials.userName;
    const password = loginCredentials.password;
    console.log(userName, password)

    await navBar.logInButton.click();
    await loginDialog.userNameTextField.fill("Ahmed Elgomeay test");
    await loginDialog.passowrdTextField.fill("mahmoud");
    await loginDialog.loginButton.click();
    await expect(navBar.logOutButton).toBeVisible();
    expect(navBar.welcomeButton).toHaveText('Welcome ' + userName);
  });
