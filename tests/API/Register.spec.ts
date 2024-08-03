import { test, expect, request } from '@playwright/test';
import { TestDataGenerator } from '../../utils/test-data/TestDataGenerator';


test('SignUp', { tag: '@APIRegister @APIRegression' }, async ({ }) => {
    const apiContext = await request.newContext();
    const testDataGenerator = TestDataGenerator.getSingleInstance();
    const signUpPayLoad = {username: testDataGenerator.getUserName(), password: testDataGenerator.getPassword()}
    const apiResponse = await apiContext.post('https://api.demoblaze.com/signup', { data:signUpPayLoad });
    expect(apiResponse.status()).toBe(200);
    expect(apiResponse.statusText()).toBe("OK");
    expect(await apiResponse.json()).toEqual("");
    testDataGenerator.modifyLoginCredentials();
});



