import { Page } from '@playwright/test';

export class EmployeeListPage {
  constructor(private page: Page) {}

  async openEmployeeList() {
    await this.page.getByRole('link', { name: 'Employee List' }).click();
  }

  async searchByEmployeeId(employeeId: string) {
    const empIdInput = this.page.locator('label:has-text("Employee Id")')
      .locator('..')
      .locator('input');

    await this.page.locator('div.oxd-input-group:has(label:has-text("Employee Id")) input').fill(employeeId);
    await this.page.getByText('Employee Information').waitFor({ state: 'visible', timeout: 60000 });
    await this.page.getByRole('button', { name: 'Search' }).click();
  }

  async clickEditEmployee(employeeId: string) {
  // tunggu tabel muncul
  await this.page.waitForSelector('div.oxd-table-row', { timeout: 120000 });

  // ambil baris yang sesuai employeeId
  const employeeRow = this.page.locator('div.oxd-table-row').filter({
    hasText: employeeId
  });

  // ambil tombol pensil di row itu
  const editButton = employeeRow.locator('button.oxd-icon-button:has(i.bi-pencil-fill)');
  await editButton.waitFor({ state: 'visible', timeout: 120000 });

  // klik tombol pensil
  await editButton.click();
}
}
