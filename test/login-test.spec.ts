import { test, expect } from '@playwright/test';
import { loginAdmin } from './helpers';

test('test', async ({ page }) => {
  await loginAdmin(page)

  // notify working
  const alertMessage = await page.textContent('[role="alert"]');
  expect(alertMessage).toContain('Action was successful');
});
