import { test, expect } from '@playwright/test';
import { customerData } from './test-data/customerData';
import {
  LoginPage,
  BankManagerPage,
  AddCustomerPage,
  OpenAccountPage,
  CustomerLoginPage,
  AccountPage,
} from './pages';

const bankingLoginUrl =
  'https://www.way2automation.com/angularjs-protractor/banking/#/login';

test.describe('Banking Application', () => {
  test('Launch banking application successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.expectBankManagerLoginVisible();
  });

  test('Navigate to Bank Manager Login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const bankManagerPage = new BankManagerPage(page);

    await loginPage.goto();
    await loginPage.clickBankManagerLogin();
    await bankManagerPage.expectUrl();
  });

  test('Add a new customer', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const bankManagerPage = new BankManagerPage(page);
    const addCustomerPage = new AddCustomerPage(page);

    await loginPage.goto();
    await loginPage.clickBankManagerLogin();
    await bankManagerPage.clickAddCustomer();

    await addCustomerPage.fillCustomerDetails(customerData);
    await addCustomerPage.submit();
  });

  test('Open an account for the newly added customer', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const bankManagerPage = new BankManagerPage(page);
    const addCustomerPage = new AddCustomerPage(page);
    const openAccountPage = new OpenAccountPage(page);

    await loginPage.goto();
    await loginPage.clickBankManagerLogin();
    await bankManagerPage.clickAddCustomer();

    await addCustomerPage.fillCustomerDetails(customerData);
    await addCustomerPage.submit();

    await bankManagerPage.clickOpenAccount();
    await openAccountPage.expectVisible();

    const fullName = `${customerData.firstName} ${customerData.lastName}`;
    await openAccountPage.selectCustomer(fullName);
    await openAccountPage.selectCurrency('Dollar');
    await openAccountPage.submit();
  });

  test('Navigate to Customer Login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const customerLoginPage = new CustomerLoginPage(page);

    await loginPage.goto();
    await loginPage.clickCustomerLogin();
    await customerLoginPage.expectUrl();
    await customerLoginPage.expectVisible();
  });

  test('Select the created customer and verify successful login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const bankManagerPage = new BankManagerPage(page);
    const addCustomerPage = new AddCustomerPage(page);
    const customerLoginPage = new CustomerLoginPage(page);
    const accountPage = new AccountPage(page);

    await loginPage.goto();
    await loginPage.clickBankManagerLogin();
    await bankManagerPage.clickAddCustomer();

    await addCustomerPage.fillCustomerDetails(customerData);
    await addCustomerPage.submit();

    await loginPage.goto();
    await loginPage.clickCustomerLogin();
    await customerLoginPage.expectUrl();

    const fullName = `${customerData.firstName} ${customerData.lastName}`;
    await customerLoginPage.selectCustomer(fullName);
    await customerLoginPage.clickLogin();

    await accountPage.expectUrl();
    await accountPage.expectCustomerNameVisible(fullName);
  });
});