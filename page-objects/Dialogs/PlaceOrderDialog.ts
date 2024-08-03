import {  Page, Locator } from '@playwright/test';

export class PlaceOrderDialog {

    private page : Page;
    nameTextField : Locator;
    countryTextField : Locator;
    cityTextField : Locator;
    creditCardTextField : Locator;
    monthTextField : Locator;
    yearTextField : Locator;
    purchaseButton : Locator;
    greenTickLogo : Locator;
    sucessConfirmationText : Locator;
    orderDetails: Locator;

    constructor(page: Page){
        this.page = page;
        this.nameTextField = page.locator('#name');
        this.countryTextField = page.locator('#country');
        this.cityTextField = page.locator('#city');
        this.creditCardTextField = page.locator('#card');
        this.monthTextField = page.locator('#month');
        this.yearTextField = page.locator('#year');
        this.purchaseButton = page.locator('button[onclick="purchaseOrder()"]');
        this.greenTickLogo = page.locator('sa-placeholder');
        this.sucessConfirmationText = page.locator('.sa-icon.sa-custom').locator("xpath=..//following-sibling::h2");
        this.orderDetails = page.locator('.lead.text-muted');
    }

    public async getOrderDetailsTextContent() {
        const orderDetailsText = await this.orderDetails.evaluateAll(
            list => list.map(element => element.textContent));
            return orderDetailsText;
    };

    public getOrderAmount(orderDetailsText) : string {
        const amountRegex = /Amount:\s*(\d+)\s*USD/;
        const amount = orderDetailsText[0].match(amountRegex)?.[1] ?? "Amount not found";
        return amount;
    }

}