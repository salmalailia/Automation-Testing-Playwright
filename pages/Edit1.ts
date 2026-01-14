// Edit.ts
import { expect, Page } from '@playwright/test';

export class EditEmployeePage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Search for an employee by ID
  async searchEmployee(employeeId: string) {
    await this.page.getByRole('textbox').nth(2).fill(employeeId);
    await this.page.getByRole('button', { name: 'Search' }).click();
  }

  // Edit employee's job details
  async editJobDetails() {
    await this.page.getByRole('button').filter({ hasText: /^$/ }).nth(3).click();
    await this.page.getByRole('link', { name: 'Job' }).click();
    await this.page.locator('.oxd-icon.bi-caret-down-fill.oxd-select-text--arrow').first().click();
    await this.page.getByRole('option', { name: 'Account Assistant' }).click();
    await this.page.locator('div:nth-child(7) > .oxd-input-group > div:nth-child(2) > .oxd-select-wrapper > .oxd-select-text > .oxd-select-text--after > .oxd-icon').click();
    await this.page.getByRole('option', { name: 'Freelance' }).click();
    await this.page.getByRole('button', { name: 'Save' }).click();
  }

  // Verify the updated employee details
  async verifyEmployeeUpdated(jobTitle: string) {
    await expect(this.page.getByText(jobTitle)).toBeVisible({ timeout: 60000 });
  }

  // API call to update employee details dynamically
  async updateEmployeeAPI(firstName: string, lastName: string) {
    const response = await this.page.evaluate(async (firstName: any, lastName: any) => {
      const res = await fetch('https://reqres.in/api/users/2', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ first_name: firstName, last_name: lastName }),
      });
      return res.json();
    }, firstName, lastName);

    console.log('API Response via fetch:', response);
  }
}