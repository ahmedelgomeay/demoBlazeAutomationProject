import { test, expect, Page } from '@playwright/test';
import { POManager } from '../../page-objects/POManager'
import { TestDataGenerator } from '../../utils/test-data/TestDataGenerator';
const pagesData =  JSON.parse(JSON.stringify(require('../../utils/test-data/PagesData.json')));

test.beforeEach('Navigate to homepage', async ({ page }) => {
  await page.goto(pagesData.homepageData.homePageURL);

});


test('User could register with valid data',{ tag: '@WebRegister @WebRegression' }, async ({ page }) => {
    const poManager = POManager.getSingleInstance(page);
    const navBar = poManager.getNavBar();
    const homePage = poManager.getHomePage();
    const signUpDialog = poManager.getSignUpDialog();
    const testDataGenerator = TestDataGenerator.getSingleInstance();

    const userName = testDataGenerator.getUserName();;
    const password = testDataGenerator.getPassword();
    testDataGenerator.modifyLoginCredentials();
  
    await homePage.validatePageTitle();
    await navBar.signUpButton.click();
    await signUpDialog.userNameTextField.fill(userName);
    await signUpDialog.passowrdTextField.fill(password);
    await signUpDialog.signUpButton.click();
    page.on('dialog', async dialog => {
      const expectedMessage: string = 'Sign up successful';
      console.log(dialog.message());
      expect(dialog.message()).toEqual(expectedMessage);
      await dialog.accept(); 
  });

  });