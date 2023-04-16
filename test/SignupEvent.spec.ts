import { test, expect } from '@playwright/test';
import { login } from './helpers';

test('test', async ({ page }) => {
  await login(page, 'davidovkyflekovky@gmail.com', 'heslo')

  await page.getByText('Choose option').click();
  await page.getByText('going', { exact: true }).click();

  // notify working
  const alertMessage = await page.textContent('[role="alert"]');
  expect(alertMessage).toContain('Action was successful');
});
