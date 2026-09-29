import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export interface CustomerData {
  firstName: string;
  lastName: string;
  postCode: string;
}

export class AddCustomerPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async fillCustomerDetails(customer: CustomerData) {
    await this.page.getByPlaceholder('First Name').fill(customer.firstName);
    await this.page.getByPlaceholder('Last Name').fill(customer.lastName);
    await this.page.getByPlaceholder('Post Code').fill(customer.postCode);
  }

  async submit(expectSuccess = true) {
    const dialogPromise = this.page.waitForEvent('dialog');
    this.page.once('dialog', async (dialog) => {
      if (expectSuccess) {
        expect(dialog.message()).toContain('Customer added successfully');
      }
      await dialog.accept();
    });

    await this.page.getByRole('form').getByRole('button', { name: 'Add Customer' }).click();
    await dialogPromise;
  }
}