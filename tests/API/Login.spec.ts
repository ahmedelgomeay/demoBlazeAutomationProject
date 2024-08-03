import { test, expect, Page, request } from '@playwright/test';
const loginCredentials = JSON.parse(JSON.stringify(require('../../utils/test-data/loginCredentials/LoginCredentials.json')));
const loginPayload = { username: loginCredentials.userName, password: loginCredentials.password };


test('Login',{ tag: '@APILogin @@APIRegression' }, async ({ }) => {
    const apiContext = await request.newContext();
    const apiResponse = await apiContext.post('https://api.demoblaze.com/login', { data:loginPayload });
    expect(apiResponse.status()).toBe(200);
    expect(apiResponse.statusText()).toBe("OK");
    expect(await apiResponse.text()).toContain('Auth_token:')
    const jsonResponse = await apiResponse.json();
    const token = jsonResponse.split(":")[1].trim();
    console.log("Token: " + token)
})

