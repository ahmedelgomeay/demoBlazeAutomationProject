import {  Page, Locator } from '@playwright/test';
export class SignUpDialog {
    
    private page : Page;
    userNameTextField: Locator;
    passowrdTextField: Locator;
    signUpButton: Locator;

    constructor(page: Page){
        this.page = page;
        this.userNameTextField = page.locator('#sign-username');
        this.passowrdTextField = page.locator('#sign-password');
        this.signUpButton = page.locator('button[onclick="register()"]');
    }


}