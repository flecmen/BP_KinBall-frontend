import { test, expect } from '@playwright/test';
import { loginAdmin } from './helpers';

test('test', async ({ page }) => {
  await loginAdmin(page)

  await page.getByRole('button', { name: 'Create an event' }).click();
  await page.getByLabel('Groups').click();
  await page.getByRole('option', { name: 'all' }).getByText('all').click();
  await page.getByRole('option', { name: 'testGroup' }).getByText('testGroup').click();
  await page.getByText('Create or update event').click();
  await page.locator('.q-form > label > .q-field__inner > .q-field__control > .q-field__control-container > .q-field__native').first().click();
  await page.getByRole('option', { name: 'trenink' }).locator('div').nth(2).click();
  await page.getByRole('spinbutton', { name: 'Price' }).click();
  await page.getByRole('spinbutton', { name: 'Price' }).fill('120');
  await page.getByRole('textbox', { name: 'Address', exact: true }).click();
  await page.getByRole('textbox', { name: 'Address', exact: true }).fill('TEST address');
  await page.getByLabel('Short address').click();
  await page.getByLabel('Short address').fill('TEST short address');
  await page.locator('#q-portal--dialog--1').getByText('event', { exact: true }).click();
  await page.getByText('access_time').click();
  await page.getByText('23', { exact: true }).nth(0).click()
  await page.getByText('55').nth(0).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();

  await page.getByText('Choose an option').click();
  await page.getByText('going', { exact: true }).nth(0).click();

  // notify working
  const alertMessage = await page.textContent('[role="alert"]');
  expect(alertMessage).toContain('Action was successful');
});
