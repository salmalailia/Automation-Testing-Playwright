// Login.ts
import { Page } from '@playwright/test';

export class LoginPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Navigate to the login page
  async goto() {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  }

  // Log in with username and password
  async login(username: string, password: string) {
    await this.page.getByRole('textbox', { name: 'Username' }).fill(username);
    await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }

  // Verify login by checking if the dashboard is loaded
  async verifyLogin() {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
  }
}