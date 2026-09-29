import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class BankManagerPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectUrl() {
    await this.waitForUrl(/manager/);
  }

  async clickAddCustomer() {
    await this.page.getByRole('button', { name: 'Add Customer' }).click();
  }

  async clickOpenAccount() {
    await this.page.getByRole('button', { name: 'Open Account' }).click();
  }

  async clickCustomers() {
    await this.page.getByRole('button', { name: 'Customers' }).click();
  }
}