import { Page, Locator } from '@playwright/test';

export class CategoriesPage {

    private page : Page;
    monitorsButton : Locator;
    appleMointor24Item : Locator;
    appleMonitor24CategoriesPrice : Locator;
    appleMonitor24ProductDetailPrice : Locator;
    addToCartButton : Locator;

    constructor(page: Page){
        this.page = page;
        this.appleMointor24Item = page.getByRole('link', { name: 'Apple monitor 24' })
        this.appleMonitor24CategoriesPrice = this.appleMointor24Item.locator("xpath=..//following-sibling::h5");
        this.appleMonitor24ProductDetailPrice = page.locator('h3.price-container');
        this.addToCartButton = page.getByRole('link', { name: 'Add to cart' })
    }




}