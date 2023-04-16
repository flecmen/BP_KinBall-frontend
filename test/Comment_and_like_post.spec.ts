import { test, expect } from '@playwright/test';
import { loginAdmin } from './helpers';

test('test', async ({ page }) => {
  await loginAdmin(page);

  await page.getByLabel('Write a comment').first().click();
  await page.getByLabel('Write a comment').first().fill('test-comment1');
  await page.getByRole('button', { name: 'send' }).first().click();
  await page.getByRole('button').filter({ hasText: 'comment1' }).click();
  expect(page.getByText('test-comment1')).toBeTruthy();
});
