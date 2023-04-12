import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:9000/#/login');
  await page.getByLabel('Email address').click();
  await page.getByLabel('Email address').fill('davidovkyflekovky@gmail.com');
  await page.getByLabel('Email address').press('Tab');
  await page.getByLabel('Password').fill('heslo');
  await page.getByRole('button', { name: 'Log in' }).click();

  await page.getByText('Choose option').click();
  await page.getByText('going', { exact: true }).click();

  // notify working
  const alertMessage = await page.textContent('[role="alert"]');
  expect(alertMessage).toContain('Action was successful');

  // await page.getByRole('listitem').filter({ hasText: 'Otázka 1 votes: 0 | 0%' }).getByRole('checkbox').click();
  // // Test that clicked listitem has now text "Otázka 1 votes: 0 | 100%"
  // await expect(await page.locator('//li[contains(text(), \'Otázka 1 votes: 0 | 100%\')]')).toBeTruthy();
});
