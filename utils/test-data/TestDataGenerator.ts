import { LoginCredentialsModifier } from "./loginCredentials/LoginCredentialsModifier";
import { faker } from '@faker-js/faker';
export class TestDataGenerator {

    private static instance: TestDataGenerator;
    private generatedUserName : string;
    private generatedPassword : string;
    private encodedPassword : string;
    private country: string;
    private city: string;
    private creditCard: string;
    private month: string;
    private year: string;

    private constructor() {
        this.generateRandomUserName();
        this.generateRandomPassword();
        this.generateEncodedPassword();
        this.generateRandomCountry();
        this.generateRandomCity();
        this.generateRandomCreditCard();
        this.generateRandomMonth();
        this.generateRandomYear();
        this.modifyLoginCredentials();
    }

    static getSingleInstance() : TestDataGenerator {
        if (!TestDataGenerator.instance) {
            TestDataGenerator.instance = new TestDataGenerator();
        }
        return TestDataGenerator.instance;
    }

    private generateRandomUserName() {
        this.generatedUserName = faker.person.fullName() + " ElGomeay";
    }

    private generateRandomPassword() {
        this.generatedPassword = faker.internet.password();
    }

    private generateEncodedPassword() {
        this.encodedPassword = LoginCredentialsModifier.b64EncodeUnicode(this.generatedPassword);
    }

    private generateRandomCountry() {
        this.country = faker.location.country();
    }

    private generateRandomCity() {
        this.city = faker.location.city();
    }

    private generateRandomCreditCard() {
        this.creditCard = faker.finance.creditCardNumber();
    }

    private generateRandomMonth() {
        this.month = faker.date.month();
    }

    private generateRandomYear() {
        this.year = faker.date.future().getFullYear().toString();
    }

    public getUserName() {
        return this.generatedUserName;
    }

    public getPassword() {
        return this.generatedPassword;
    }

    public getCountry() {
        return this.country;
    }

    public getCity() {
        return this.city;
    }

    public getCreditCard() {
        return this.creditCard;
    }

    public getMonth() {
        return this.month;
    }

    public getYear() {
        return this.year;
    }

    public getEncodedPassword() {
        return this.encodedPassword;
    }


     public modifyLoginCredentials() {
        const lines = [2,3,4]
        const userName = this.generatedUserName;
        const password = this.generatedPassword;
        const encodedPassword = this.encodedPassword;
        const values = [`"userName": "${userName}",`, `"password": "${password}",`, `"encodedPassword": "${encodedPassword}"`];
        LoginCredentialsModifier.addValuesToLines(lines, values)
    }
    
}