import { expect, Page, Locator } from '@playwright/test';
const pagesData =  JSON.parse(JSON.stringify(require('../utils/test-data/PagesData.json')));
export class HomePage {
    
    private page : Page;
    monitorsButton: Locator;

    constructor(page: Page){
        this.page = page;
        this.monitorsButton = page.getByRole('link', { name: 'Monitors' })
    }

     public goTo() {
      return this.page.goto(pagesData.homepageData.homePageURL);
    }

     public async validatePageTitle() {
        const pageTitle : string = pagesData.homepageData.title;
        return expect(await this.page.title()).toBe(pageTitle);
    }

}