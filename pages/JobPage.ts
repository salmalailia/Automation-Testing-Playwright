import { Page, expect } from '@playwright/test';

export class JobPage {
  constructor(private page: Page) {}

  /** Tunggu halaman OrangeHRM selesai loading */
  private async waitForPageReady() {
    // jika ada spinner loading (aman walau tidak ada)
    const loader = this.page.locator('.oxd-loading-spinner');
    await loader.waitFor({ state: 'hidden', timeout: 60000 }).catch(() => {});
  }

  /** Buka tab Job dan tunggu Job Details muncul */
  async openJobTab() {
    await this.waitForPageReady();

    const jobTab = this.page.locator('a.orangehrm-tabs-wrapper', { hasText: 'Job' });

    // 🔑 WAJIB: tunggu tab muncul dulu
    await expect(jobTab).toBeVisible({ timeout: 120000 });

    // cek apakah sudah aktif
    const isActive = await jobTab.evaluate(el =>
      el.classList.contains('--active')
    );

    if (!isActive) {
      await jobTab.scrollIntoViewIfNeeded();
      await jobTab.click(); // tidak pakai force
    }

    // tunggu Job Details tampil
    const jobDetailsHeader = this.page.getByText('Job Details');
    await expect(jobDetailsHeader).toBeVisible({ timeout: 120000 });
  }

  /** Pilih opsi dropdown berdasarkan label */
  private async selectDropdownByLabel(label: string, optionText: string) {
    const group = this.page.locator(`label:has-text("${label}")`).locator('..');
    const dropdown = group.locator('.oxd-select-text');

    await expect(dropdown).toBeVisible({ timeout: 120000 });
    await dropdown.click();

    const option = this.page
      .locator('.oxd-select-dropdown .oxd-select-option')
      .filter({ hasText: optionText });

    await expect(option).toBeVisible({ timeout: 120000 });
    await option.click();
  }

  /** Edit Job Title dan Employment Status */
  async editJob(jobTitle: string, employmentStatus: string) {
    await this.openJobTab();

    await this.selectDropdownByLabel('Job Title', jobTitle);
    await this.selectDropdownByLabel('Employment Status', employmentStatus);

    const saveButton = this.page.getByRole('button', { name: 'Save' });
    await expect(saveButton).toBeVisible({ timeout: 120000 });
    await saveButton.click();
  }

  /** Verifikasi Job Title dan Employment Status */
  async verifyJob(jobTitle: string, employmentStatus: string) {
    await this.openJobTab();

    const jobTitleDropdown = this.page
      .locator('label:has-text("Job Title")')
      .locator('..')
      .locator('.oxd-select-text');

    await expect(jobTitleDropdown).toHaveText(jobTitle, { timeout: 120000 });

    const employmentStatusDropdown = this.page
      .locator('label:has-text("Employment Status")')
      .locator('..')
      .locator('.oxd-select-text');

    await expect(employmentStatusDropdown).toHaveText(employmentStatus, { timeout: 120000 });
  }
}