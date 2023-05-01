import { test, expect } from '@playwright/test';
import { loginAdmin } from './helpers';

test('test', async ({ page }) => {
  await loginAdmin(page);

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

  await page.getByRole('button', { name: 'Write a post' }).click();
  await page.getByRole('radio', { name: 'survey' }).click();
  await page.getByLabel('Groups').click();
  await page.getByRole('option', { name: 'all' }).getByText('all').click();
  await page.getByRole('combobox', { name: 'Groups' }).press('Escape');
  await page.getByLabel('Heading').click();
  await page.getByLabel('Heading').fill('Test Survey Heading 1');
  await page.getByLabel('Heading').press('Tab');
  await page.getByRole('textbox', { name: 'Text' }).fill('Test ');
  await page.getByRole('textbox', { name: 'Text' }).press('Shift+Enter');
  await page.getByRole('textbox', { name: 'Text' }).fill('Test Survey Text 1');
  await page.getByLabel('New survey question').click();
  await page.getByLabel('New survey question').fill('Choice 1');
  await page.getByRole('button', { name: 'Add', exact: true }).click();
  await page.getByLabel('New survey question').click();
  await page.getByLabel('New survey question').fill('Choice 2');
  await page.getByRole('button', { name: 'Add', exact: true }).click();
  await page.getByRole('button', { name: 'Submit' }).click();

  expect(page.getByText('Test Survey Heading 1')).toBeTruthy();
  expect(page.getByRole('listitem').filter({ hasText: 'Choice 1 votes: 0 | 0%' }).getByRole('checkbox')).toBeTruthy();


});
