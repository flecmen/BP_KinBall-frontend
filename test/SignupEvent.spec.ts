import { test, expect } from '@playwright/test';
import { login } from './helpers';

test('test', async ({ page }) => {
  await login(page, 'davidovkyflekovky@gmail.com', 'heslo')

  await page.getByText('Choose option').click();
  await page.getByText('going', { exact: true }).click();

  // notify working
  const alertMessage = await page.textContent('[role="alert"]');
  expect(alertMessage).toContain('Action was successful');

  // await page.getByRole('listitem').filter({ hasText: 'Otázka 1 votes: 0 | 0%' }).getByRole('checkbox').click();
  // // Test that clicked listitem has now text "Otázka 1 votes: 0 | 100%"
  // await expect(await page.locator('//li[contains(text(), \'Otázka 1 votes: 0 | 100%\')]')).toBeTruthy();
});
