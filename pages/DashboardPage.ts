import { Page } from '@playwright/test';

export class DashboardPage {
  constructor(private page: Page) {}

  async goToPIM() {
    await this.page.getByRole('link', { name: 'PIM' }).click();
  }

  async logout() {
    await this.page.locator('.oxd-userdropdown-tab').click();
    await this.page.getByRole('menuitem', { name: 'Logout' }).click();
  }
}
