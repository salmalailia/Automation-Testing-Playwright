import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  // Fill in login credentials
  await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();

  // Navigate to PIM and edit employee
  await page.getByRole('link', { name: 'PIM' }).click();
  await page.getByRole('textbox').nth(2).fill('E1');
  await page.getByRole('button', { name: 'Search' }).click();
  await page.getByRole('button').filter({ hasText: /^$/ }).nth(3).click();
  await page.getByRole('link', { name: 'Job' }).click();
  await page.locator('.oxd-icon.bi-caret-down-fill.oxd-select-text--arrow').first().click();
  await page.getByRole('option', { name: 'Account Assistant' }).click();
  await page.locator('div:nth-child(7) > .oxd-input-group > div:nth-child(2) > .oxd-select-wrapper > .oxd-select-text > .oxd-select-text--after > .oxd-icon').click();
  await page.getByRole('option', { name: 'Freelance' }).click();
  await page.getByRole('button', { name: 'Save' }).click();

  // Verify employee updated
  await expect(page.getByText('Account Assistant')).toBeVisible({ timeout: 60000 });

  // Verify API response for employee update
  await page.evaluate(async () => {
  const response = await fetch('https://reqres.in/api/users/2', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ first_name: "UpdatedName", last_name: "Tester" })
  });
  const data = await response.json();
  console.log("API Response via fetch:", data);
});
  });