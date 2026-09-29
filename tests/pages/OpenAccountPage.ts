import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class OpenAccountPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectVisible() {
    await expect(this.page.locator('#userSelect')).toBeVisible();
  }

  async selectCustomer(fullName: string) {
    await this.page.locator('#userSelect').selectOption({ label: fullName });
  }

  async selectCurrency(currency: string) {
    await this.page.locator('#currency').selectOption({ label: currency });
  }

  async submit(expectSuccess = true) {
    const dialogPromise = this.page.waitForEvent('dialog');
    this.page.once('dialog', async (dialog) => {
      if (expectSuccess) {
        expect(dialog.message()).toContain('Account created successfully');
      }
      await dialog.accept();
    });

    await this.page.getByRole('form').getByRole('button', { name: 'Process' }).click();
    await dialogPromise;
  }
}