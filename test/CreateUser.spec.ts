import { test, expect } from '@playwright/test';
import { loginAdmin } from './helpers';

test('test', async ({ page }) => {
  await loginAdmin(page);

  // CREATE USER
  await page.getByRole('button', { name: 'Admin' }).click();
  await page.getByRole('link', { name: 'users Manage users' }).click();
  await page.getByRole('button', { name: 'New' }).click();
  await page.getByLabel('Name').click();
  await page.getByLabel('Name').fill('TEST_name');
  await page.getByLabel('Name').press('Tab');
  await page.getByLabel('Email').fill('TEST@email.com');
  await page.locator('label:nth-child(3) > .q-field__inner > .q-field__control > .q-field__control-container > .q-field__native').click();
  await page.getByRole('option', { name: 'hráč' }).getByText('hráč').click();
  await page.getByLabel('Groups').click();
  await page.getByRole('option', { name: 'all' }).getByText('all').click();
  await page.getByText('newcommers').click();
  await page.getByRole('combobox', { name: 'Groups' }).press('Escape');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByPlaceholder('Search').click()
  await page.getByPlaceholder('Search').fill('TEST');
  //wait for 3s
  await page.waitForTimeout(3000);

  expect(page.getByRole('cell', { name: 'TEST_name' })).toBeTruthy();

  // EDIT USER
  await page.getByRole('button').filter({ hasText: 'edit' }).click();
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill('TEST@TEST.com');
  await page.getByRole('button', { name: 'Submit' }).click();

  expect(page.getByRole('cell', { name: 'TEST@TEST.com' })).toBeTruthy()

  // DELETE USER
  await page.getByRole('row', { name: 'TEST@TEST.com' }).getByRole('button').filter({ hasText: 'delete' }).click();
  await page.getByRole('button', { name: 'Delete' }).click();


  // CREATE GROUP
  await page.getByRole('button', { name: 'Admin' }).click();
  await page.getByRole('link', { name: 'groups Manage groups' }).click();
  await page.getByRole('button', { name: 'New' }).click();
  await page.getByLabel('Name').click();
  await page.getByLabel('Name').fill('TEST_GROUP');
  await page.getByLabel('colorizeWith validation').click();
  await page.getByText('colorize').click();
  await page.locator('.q-color-picker__spectrum-black').click();
  await page.getByLabel('colorizeWith validation').click();
  await page.getByRole('button', { name: 'Submit' }).click();

  expect(page.getByRole('cell', { name: 'TEST_GROUP' })).toBeTruthy();

  // DELETE GROUP
  await page.getByRole('row', { name: 'TEST_GROUP' }).getByRole('button').filter({ hasText: 'delete' }).click();
  await page.getByRole('button', { name: 'delete' }).click();

  //wait for 3s
  await page.waitForTimeout(3000);
  expect(page.getByRole('cell', { name: 'TEST_GROUP' })).not.toBeVisible()

});
