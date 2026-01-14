// Delete.ts
import { expect, Page } from '@playwright/test';

export class DeleteEmployeePage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Delete an employee after searching by ID
  async searchEmployee(employeeId: string) {
    await this.page.getByRole('textbox').nth(2).fill(employeeId);
    await this.page.getByRole('button', { name: 'Search' }).click();
  }

  // Confirm and delete the employee
  async deleteEmployee() {
    await this.page.getByRole('button').filter({ hasText: /^$/ }).nth(4).click();
    await this.page.getByRole('button', { name: 'Yes, Delete' }).click();
  }

  // Verify the deletion message
  async verifyEmployeeDeleted() {
    await expect(this.page.getByText('Successfully Deleted')).toBeVisible({ timeout: 60000 });
  }

  // API call to delete employee
  async deleteEmployeeAPI() {
    const response = await this.page.evaluate(async () => {
      const res = await fetch('https://reqres.in/api/users/2', {
        method: 'DELETE',
      });
      return res.json();
    });
    console.log('API Response via fetch:', response);
  }

  // Log out after deletion
  async logout() {
    await this.page.locator('span').filter({ hasText: '/user$/' }).click();
    await this.page.getByRole('menuitem', { name: 'Logout' }).click();
  }

  // Verify successful logout
  async verifyLogout() {
    await expect(this.page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  }
}
