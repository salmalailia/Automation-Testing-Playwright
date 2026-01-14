// Add.ts
import { expect, Page } from '@playwright/test';

export class AddEmployeePage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Navigate to PIM and Add Employee
  async gotoPIM() {
    await this.page.getByRole('link', { name: 'PIM' }).click();
    await this.page.getByRole('link', { name: 'Add Employee' }).click();
  }

  // Add a new employee with details
  async addEmployee(firstName: string, lastName: string, profilePicPath: string, employeeId: string) {
    await this.page.getByRole('textbox', { name: 'First Name' }).fill(firstName);
    await this.page.getByRole('textbox', { name: 'Last Name' }).fill(lastName);
    await this.page.locator('form').getByRole('img', { name: 'profile picture' }).click();
    const fileInput = this.page.locator('input[type="file"]');
    await fileInput.setInputFiles(profilePicPath);
    await this.page.getByRole('textbox').nth(4).fill(employeeId);
    await this.page.getByRole('button', { name: 'Save' }).click();
  }

  // Verify employee creation
  async verifyEmployeeCreated(firstName: string, lastName: string) {
    await expect(this.page.getByRole('heading', { name: `${firstName} ${lastName}` })).toBeVisible({ timeout: 60000 });
  }
}
