import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:9000/#/login');
  await page.getByLabel('Email address').click();
  await page.getByLabel('Email address').fill('davidovkyflekovky@gmail.com');
  await page.getByLabel('Email address').press('Tab');
  await page.getByLabel('Password').fill('heslo');
  await page.getByLabel('Password').press('Enter');

  await page.getByRole('button', { name: 'Write a post' }).click();
  await page.getByLabel('Groups').click();
  await page.getByRole('option', { name: 'all' }).getByText('all').click();
  await page.getByRole('combobox', { name: 'Groups' }).press('Escape');
  await page.getByRole('textbox', { name: 'Text' }).click();
  await page.getByLabel('Heading').click();
  await page.getByLabel('Heading').fill('Playwright test heading');
  await page.getByRole('textbox', { name: 'Text' }).click();
  await page.getByRole('textbox', { name: 'Text' }).fill('Playwright test Text');
  await page.getByRole('button', { name: 'Submit' }).click();

  expect(page.locator('//div[contains(text(), \'Playwright test heading\')]/following-sibling::div[contains(text(), \'Playwright test Text\')]')).toBeTruthy();

});
