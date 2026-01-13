import { Page, expect } from '@playwright/test';

export class AddEmployeePage {
  constructor(private page: Page) {}

  async openAddEmployee() {
    await this.page.getByRole('link', { name: 'Add Employee' }).click();
  }

  async addEmployee(firstName: string, lastName: string, employeeId: string) {
  await this.page.getByPlaceholder('First Name').fill(firstName);
  await this.page.getByPlaceholder('Last Name').fill(lastName);
  await this.page.locator('div.oxd-input-group:has(label:has-text("Employee Id")) input').fill(employeeId);

  // Upload foto profile
  const fileInput = this.page.locator('input[type="file"]');
  await fileInput.setInputFiles('data/profile.png');

  // Klik tombol Save
  await this.page.getByRole('button', { name: 'Save' }).click();
}

  async verifyEmployeeCreated(firstName: string, lastName: string) {
    await expect(
      this.page.getByRole('heading', { name: `${firstName} ${lastName}` })
    )
    .toBeVisible({ timeout: 60000 });
  }
}
