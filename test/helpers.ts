// helpers.js

import { Page } from '@playwright/test';

export async function login(page: Page, email: string, password: string) {
  await page.goto('http://localhost:9000/#/login');
  await page.getByLabel('Email address').click();
  await page.getByLabel('Email address').fill(email);
  await page.getByLabel('Email address').press('Tab');
  await page.getByLabel('Password').fill(password);
  await page.getByRole('button', { name: 'Log in' }).click();
}
