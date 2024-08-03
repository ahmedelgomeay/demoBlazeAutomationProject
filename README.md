# DemoBlaze Automation Project
==========================

## Overview
------------

This project is designed to automate testing for the DemoBlaze website using Playwright.

## Project Structure
-------------------
* `page-objects`: Contains page object models and dialogs
    +  `POMManager`: Initializes Page Object Models for all Pages.
    +  `SignUpDialog.ts`: Contains locators for SignUp Dialog.
    +  `LoginDialog.ts`: Contains locators for Login Dialog.
    +  `PlaceOrderDialog.ts`: Contains locators for Place Order Dialog.
    +  `NavBar`: Contains locators for Navigation Bar.
    +  `HomePage`: Contains locators for Homepage.
    +  `CategoriesPage`: Contains locators for Categories.


* `utils/test-data`: Contains JSON files with test data for different scenarios.
	+ `PagesData.json`: Contains data for the homepage.
	+ `ProductsData.json`: Contains data for products.
	+ `LoginCredentials.json`: Contains login credentials.
    + `LoginCredentialsModifier.json`: Modifies LoginCredentials.json with updated Registeration Data.
    + `PagesData.json`: Contains title & URLs for each page.
    + `ProductsData.json`: Contains product details & their prices.
    + `TestDataGenerator`: Generates Test Data using Faker dependency.


* `package.json`: Contains project metadata and scripts for running tests.

## Running Tests
---------------

To run tests, use the following scripts:

* `webRegression`: Runs web regression tests.
* `webRegister`: Runs web registration tests.
* `webLogin`: Runs web login tests.
* `webLogout`: Runs web logout tests.
* `webCreateOrder`: Runs web create order tests.
* `apiRegression`: Runs API regression tests.
* `apiRegister`: Runs API registration tests.
* `apiLogin`: Runs API login tests.


## Reporting
---------------
* Test reports are generated in the reports directory. The reports include information about test execution, test results, and any failures or errors encountered during the tests.

## Dependencies
------------

* `@faker-js/faker`: Used for generating fake data.
* `@playwright/test`: Used for running Playwright tests.
* `@types/node`: Used for type definitions for Node.js.
