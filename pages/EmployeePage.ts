import { Page, expect } from '@playwright/test';

export class EmployeePage {
  constructor(private page: Page) {}

  async goToAddEmployee() {
    await this.page.getByRole('link', { name: 'PIM' }).click();
    await this.page.getByRole('link', { name: 'Add Employee' }).click();
  }

  async addEmployee(first: string, last: string, empId: string) {
    await this.page.getByPlaceholder('First Name').fill(first);
    await this.page.getByPlaceholder('Last Name').fill(last);

    const idInput = this.page.locator(
      '//label[text()="Employee Id"]/following::input[1]'
    );
    await idInput.fill(empId);

    await this.page.getByRole('button', { name: 'Save' }).click();
  }

  async searchAndOpenEmployee(empId: string) {
    await this.page.getByRole('link', { name: 'Employee List' }).click();

    const idInput = this.page.locator(
      '//label[text()="Employee Id"]/following::input[1]'
    );
    await idInput.fill(empId);

    await this.page.getByRole('button', { name: 'Search' }).click();

    // klik icon pensil di tabel
    await this.page
      .locator('tr', { hasText: empId })
      .locator('button:has(i.bi-pencil-fill)')
      .click();
  }

  async deleteEmployee(empId: string) {
    await this.page
      .locator('tr', { hasText: empId })
      .locator('button:has(i.bi-trash)')
      .click();

    await this.page.getByRole('button', { name: 'Yes, Delete' }).click();
  }
}
