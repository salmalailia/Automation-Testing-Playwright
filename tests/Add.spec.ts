import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  // Fill in login credentials
  await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();

  // Navigate to PIM and add employee
  await page.getByRole('link', { name: 'PIM' }).click();
  await page.getByRole('link', { name: 'Add Employee' }).click();
  await page.getByRole('textbox', { name: 'First Name' }).fill('Salma');
  await page.getByRole('textbox', { name: 'Last Name' }).fill('Lailia');
  await page.locator('form').getByRole('img', { name: 'profile picture' }).click();

  // Upload profile picture
  const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles('data/profile.png');
  await page.getByRole('textbox').nth(4).fill('E1');
  await page.getByRole('button', { name: 'Save' }).click();

  // Verify employee created
  await expect(page.getByRole('heading', { name: 'Salma Lailia' })).toBeVisible({ timeout: 60000 })
  });