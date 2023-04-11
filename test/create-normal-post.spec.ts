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

  // notify working
  const alertMessage = await page.textContent('[role="alert"]');
  expect(alertMessage).toContain('Action was successful');

  await expect(await page.locator('//div[contains(text(), \'Playwright test heading\')]/following-sibling::div[contains(text(), \'Playwright test Text\')]')).toBeTruthy();
  await page.getByText('Playwright test heading').click();
  await page.locator('.q-card__section > button').first().click();
  await page.getByRole('button').filter({ hasText: 'favorite1' }).click();
  await page.locator('#f_b37c1278-262e-48e0-9897-f3a9a7157a01').click();
  await page.locator('#f_b37c1278-262e-48e0-9897-f3a9a7157a01').fill('Random comment');
  await page.locator('.q-ml-md > .q-btn').first().click();
  await page.getByText('Action was successful').click();
  await page.getByRole('button').filter({ hasText: 'comment1' }).click();
  await page.getByText('Random comment like').click();
  await page.getByRole('button', { name: 'like' }).click();
  await page.getByRole('button', { name: 'like' }).click();
});
