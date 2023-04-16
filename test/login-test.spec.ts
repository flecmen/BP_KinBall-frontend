import { test, expect } from '@playwright/test';
import { login } from './helpers';

test('test', async ({ page }) => {
  await login(page, 'davidovkyflekovky@gmail.com', 'heslo')

  // notify working
  const alertMessage = await page.textContent('[role="alert"]');
  expect(alertMessage).toContain('Action was successful');
});
