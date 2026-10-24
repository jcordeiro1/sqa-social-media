
import { test, expect } from '@playwright/test';

test('Usuario sem login nao pode curtir post', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await expect(
    page.getByText('Feed de Posts')
  ).toBeVisible();

  const clique = page.getByRole('button', {
    name: /Curtir/i
  }).first();

  const alertaPromise = page.waitForEvent('dialog');
  const cliquePromise = clique.click();

  const alerta = await alertaPromise;

  expect(alerta.message()).toBe(
    'Você precisa estar autenticado para curtir posts!'
  );

  await alerta.accept();
  await cliquePromise;
});
