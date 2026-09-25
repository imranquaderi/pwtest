import { test, expect } from '@playwright/test';
import { customerData } from './test-data/customerData';

const bankingLoginUrl =
  'https://www.way2automation.com/angularjs-protractor/banking/#/login';


//Launch the banking application URL successfully.
  test('Launch banking application successfully', async ({ page }) => {
  await page.goto(bankingLoginUrl);

  await expect(page).toHaveURL(
    /way2automation\.com\/angularjs-protractor\/banking\/#\/login/
  );

  await expect(
    page.getByRole('button', { name: 'Bank Manager Login' })
  ).toBeVisible();
});

//Navigate to the Bank Manager Login section.
test('Navigate to Bank Manager Login', async ({ page }) => {
  await page.goto(bankingLoginUrl);

  await page.getByRole('button', { name: 'Bank Manager Login' }).click();

  await expect(page).toHaveURL(/manager/);
});

//Add a new customer with valid customer details.
test('Add a new customer', async ({ page }) => {
  await page.goto(bankingLoginUrl);

  await page.getByRole('button', { name: 'Bank Manager Login' }).click();
  await page.getByRole('button', { name: 'Add Customer' }).click();

  await page.getByPlaceholder('First Name').fill(customerData.firstName);
  await page.getByPlaceholder('Last Name').fill(customerData.lastName);
  await page.getByPlaceholder('Post Code').fill(customerData.postCode);

  page.once('dialog', async (dialog) => {
    expect(dialog.message()).toContain('Customer added successfully');
    await dialog.accept();
  });

  await page
    .getByRole('form')
    .getByRole('button', { name: 'Add Customer' })
    .click();
});


test('Open an account for the newly added customer', async ({ page }) => {
  // Launch banking application
  await page.goto(bankingLoginUrl);

  // Navigate to Bank Manager Login
  await page.getByRole('button', { name: 'Bank Manager Login' }).click();

  // Navigate to Add Customer
  await page.getByRole('button', { name: 'Add Customer' }).click();

  // Enter customer details
  await page.getByPlaceholder('First Name').fill(customerData.firstName);
  await page.getByPlaceholder('Last Name').fill(customerData.lastName);
  await page.getByPlaceholder('Post Code').fill(customerData.postCode);

  // Handle customer creation dialog (using page.once like the working test)
  const customerDialogPromise = page.waitForEvent('dialog');
  page.once('dialog', async (dialog) => {
    expect(dialog.message()).toContain('Customer added successfully');
    await dialog.accept();
  });

  // Add customer
  await page.getByRole('form').getByRole('button', { name: 'Add Customer' }).click();

  // Wait for dialog to complete
  await customerDialogPromise;

  // Navigate to Open Account
  await page.getByRole('button', { name: 'Open Account' }).click();

  // Verify Open Account section
  await expect(page.locator('#userSelect')).toBeVisible();

  // Select newly created customer
  await page.locator('#userSelect').selectOption({
    label: `${customerData.firstName} ${customerData.lastName}`,
  });

  // Select currency
  await page.locator('#currency').selectOption({ label: 'Dollar' });

  // Handle account creation dialog
  const accountDialogPromise = page.waitForEvent('dialog');
  page.once('dialog', async (dialog) => {
    expect(dialog.message()).toContain('Account created successfully');
    await dialog.accept();
  });

  // Create account
  await page.getByRole('form').getByRole('button', { name: 'Process' }).click();

  // Wait for dialog to complete
  await accountDialogPromise;
});

test('Navigate to Customer Login', async ({ page }) => {

  // Launch banking application
  await page.goto(bankingLoginUrl);

  // Click Customer Login
  await page.getByRole('button', {
    name: 'Customer Login'
  }).click();

  // Verify URL
  await expect(page).toHaveURL(/customer/);

  // Verify Customer Login section
  await expect(
    page.locator('#userSelect')
  ).toBeVisible();

});

test('Select the created customer and verify successful login', async ({ page }) => {
  // First, create the customer via Bank Manager
  await page.goto(bankingLoginUrl);
  await page.getByRole('button', { name: 'Bank Manager Login' }).click();
  await page.getByRole('button', { name: 'Add Customer' }).click();

  await page.getByPlaceholder('First Name').fill(customerData.firstName);
  await page.getByPlaceholder('Last Name').fill(customerData.lastName);
  await page.getByPlaceholder('Post Code').fill(customerData.postCode);

  const customerDialogPromise = page.waitForEvent('dialog');
  page.once('dialog', async (dialog) => {
    expect(dialog.message()).toContain('Customer added successfully');
    await dialog.accept();
  });

  await page.getByRole('form').getByRole('button', { name: 'Add Customer' }).click();
  await customerDialogPromise;

  // Now navigate to Customer Login
  await page.goto(bankingLoginUrl);
  await page.getByRole('button', { name: 'Customer Login' }).click();

  // Verify Customer Login page
  await expect(page).toHaveURL(/customer/);

  // Select the created customer
  await page.locator('#userSelect').selectOption({
    label: `${customerData.firstName} ${customerData.lastName}`,
  });

  // Click Login
  await page.getByRole('button', { name: 'Login' }).click();

  // Verify successful login
  await expect(page).toHaveURL(/account/);

  // Verify customer name is displayed
  await expect(
    page.getByText(`${customerData.firstName} ${customerData.lastName}`)
  ).toBeVisible();
});