import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class AccountPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectUrl() {
    await this.waitForUrl(/account/);
  }

  async expectCustomerNameVisible(fullName: string) {
    await expect(this.page.getByText(fullName)).toBeVisible();
  }
}