import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  // Fill in login credentials
  await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();

  // Navigate to PIM and delete employee
  await page.getByRole('link', { name: 'PIM' }).click();
  await page.getByRole('textbox').nth(2).fill('E1');
  await page.getByRole('button', { name: 'Search' }).click();
  await page.getByRole('button').filter({ hasText: /^$/ }).nth(4).click();
  await page.getByRole('button', { name: 'Yes, Delete' }).click();

  // Verify employee deleted
  await expect(page.getByText('Successfully Deleted')).toBeVisible({ timeout: 60000 });

  // Verify API response for employee deletion
  await page.evaluate(async () => {
    const response = await fetch('https://reqres.in/api/users/2', {
      method: 'DELETE'
    });
    const data = await response.json();
    console.log("API Response via fetch:", data);
  });

  // Logout
  await page.locator('span').filter({ hasText: '/user$/' }).click();
  await page.getByRole('menuitem', { name: 'Logout' }).click();

  // Verify successful logout
  await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
});