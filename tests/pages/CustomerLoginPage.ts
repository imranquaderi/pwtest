import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CustomerLoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectUrl() {
    await this.waitForUrl(/customer/);
  }

  async expectVisible() {
    await expect(this.page.locator('#userSelect')).toBeVisible();
  }

  async selectCustomer(fullName: string) {
    await this.page.locator('#userSelect').selectOption({ label: fullName });
  }

  async clickLogin() {
    await this.page.getByRole('button', { name: 'Login' }).click();
  }
}