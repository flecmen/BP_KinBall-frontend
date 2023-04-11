import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:9000/');
  await page.goto('http://localhost:9000/#/');
  await page.goto('http://localhost:9000/#/login');
  await page.getByLabel('Email address').click();
  await page.getByLabel('Email address').fill('davidovkyflekovky@gmail.com');
  await page.getByLabel('Email address').press('Tab');
  await page.getByLabel('Password').fill('heslo');
  await page.getByRole('button', { name: 'Log in' }).click();

  // notify working
  const alertMessage = await page.textContent('[role="alert"]');
  expect(alertMessage).toContain('Action was successful');
});
