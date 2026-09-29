import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async goto() {
    await super.goto('https://www.way2automation.com/angularjs-protractor/banking/#/login');
    await this.waitForUrl(/way2automation\.com\/angularjs-protractor\/banking\/#\/login/);
  }

  async clickBankManagerLogin() {
    await this.page.getByRole('button', { name: 'Bank Manager Login' }).click();
  }

  async clickCustomerLogin() {
    await this.page.getByRole('button', { name: 'Customer Login' }).click();
  }

  async expectBankManagerLoginVisible() {
    await expect(this.page.getByRole('button', { name: 'Bank Manager Login' })).toBeVisible();
  }
}