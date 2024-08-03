import { Page, Locator } from '@playwright/test';
const pagesData =  JSON.parse(JSON.stringify(require('../utils/test-data/PagesData.json')));
export class NavBar {

    private page: Page;
    signUpButton: Locator;
    logInButton: Locator;
    logOutButton: Locator;
    welcomeButton: Locator;
    cartButton: Locator;
    
    constructor(page: Page){
        this.page = page;
        this.signUpButton = page.locator("#signin2");
        this.logInButton = page.locator('#login2');
        this.logOutButton = page.locator('#logout2');
        this.welcomeButton = page.locator('#nameofuser');
        this.cartButton = page.locator('#cartur');
    }

}
