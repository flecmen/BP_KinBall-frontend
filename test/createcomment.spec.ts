import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:9000/');
  await page.goto('http://localhost:9000/#/');
  await page.goto('http://localhost:9000/#/login');
  await page.getByLabel('Email address').click();
  await page.getByLabel('Email address').fill('davidovkyflekovky@gmail.com');
  await page.getByLabel('Email address').press('Tab');
  await page.getByLabel('Password').fill('heslo');
  await page.getByLabel('Password').press('Enter');
  await page.getByLabel('Write a comment').first().click();
  await page.getByLabel('Write a comment').first().fill('test-comment1');
  await page.getByRole('button', { name: 'send' }).first().click();
  await page.getByRole('button').filter({ hasText: 'comment1' }).click();
  expect(page.getByText('test-comment1')).toBeTruthy();
});
