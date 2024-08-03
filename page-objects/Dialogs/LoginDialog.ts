import {  Page, Locator } from '@playwright/test';
export class LoginDialog {
    
    private page : Page;
    userNameTextField: Locator;
    passowrdTextField: Locator;
    loginButton: Locator;

    constructor(page: Page){
        this.page = page;
        this.userNameTextField = page.locator('#loginusername');
        this.passowrdTextField = page.locator('#loginpassword');
        this.loginButton = page.locator('button[onclick="logIn()"]');
    }


}