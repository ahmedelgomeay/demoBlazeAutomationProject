
import { Page } from '@playwright/test';
import { HomePage } from './HomePage'
import { CategoriesPage } from './CategoriesPage';
import { NavBar } from './NavBar';
import { ProductsPage } from './ProductsPage';
import { LoginDialog } from './Dialogs/LoginDialog';
import { SignUpDialog } from './Dialogs/SignUpDialog';
import { PlaceOrderDialog } from './Dialogs/PlaceOrderDialog';

export class POManager {

    private static instance: POManager;
    private page : Page;
    private homePage : HomePage;
    private categoriesPage : CategoriesPage
    private navBar : NavBar;
    private productsPage : ProductsPage;
    private loginDialog : LoginDialog;
    private signUpDialog : SignUpDialog;
    private placeOrderDialog : PlaceOrderDialog;

    constructor(page: Page){
        this.page = page;
        this.navBar = new NavBar(this.page);
        this.homePage = new HomePage(this.page);
        this.categoriesPage = new CategoriesPage(this.page);
        this.productsPage = new ProductsPage(this.page);
        this.loginDialog = new LoginDialog(this.page);
        this.signUpDialog = new SignUpDialog(this.page);
        this.placeOrderDialog = new PlaceOrderDialog(this.page);
    }

    public static getSingleInstance(page: Page) : POManager {
        if (!POManager.instance) {
            POManager.instance = new POManager(page);
        }
        return POManager.instance;
    }

    public getNavBar() {
        return this.navBar;
    }

    public getHomePage() {
        return this.homePage;
    }


    public getCategoriesPage() {
        return this.categoriesPage;
    }

    public getProductsPage() {
        return this.productsPage;
    }

    public getLoginDialog() {
        return this.loginDialog;
    }

    public getSignUpDialog() {
        return this.signUpDialog;
    }

    public getPlaceOrderDialog()  {
        return this.placeOrderDialog;}


}