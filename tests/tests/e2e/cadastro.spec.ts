
import { test, expect } from '@playwright/test';

test('Usuario deve conseguir criar conta pelo navegador', async ({ page }) => {
  const email = `e2e-${Date.now()}@example.com`;

  await page.goto('http://localhost:3000/signup');

  await expect(
    page.getByRole('heading', { name: 'Criar Conta' })
  ).toBeVisible();

  await page.getByPlaceholder('seu@email.com').fill(email);

  await page.locator('input[type="password"]').nth(0).fill('Abcdef1@x');

  await page.locator('input[type="password"]').nth(1).fill('Abcdef1@x');

  await page.getByRole('main').getByRole('button', {
  name: 'Criar Conta'
}).click();

  await expect(page).toHaveURL('http://localhost:3000/');

  await expect(
    page.getByRole('button', { name: 'Sair' })
  ).toBeVisible();
});
