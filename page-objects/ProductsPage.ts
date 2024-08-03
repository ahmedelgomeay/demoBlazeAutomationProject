import {  Page, Locator } from '@playwright/test';

export class ProductsPage {

    private page : Page;
    placeOrderButton: Locator;
    orderTotalText: Locator;

    constructor(page: Page){
        this.page = page;
        this.placeOrderButton = page.getByRole('button', { name: 'Place Order' })
        this.orderTotalText = page.locator("#totalm");

    }


}