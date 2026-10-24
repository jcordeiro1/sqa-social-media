
import { test, expect } from '@playwright/test';

test('Usuario deve conseguir fazer login pelo navegador', async ({ page, request }) => {
  const email = `login-e2e-${Date.now()}@example.com`;
  const senha = 'Abcdef1@x';

  // Preparar um usuário real para o teste
  const cadastro = await request.post('http://localhost:8081/auth/signup', {
    data: {
      email: email,
      password: senha
    }
  });

  expect(cadastro.status()).toBe(200);

  // Abrir a tela de login
  await page.goto('http://localhost:3000/signin');

  await expect(
    page.getByRole('heading', { name: 'Entrar' })
  ).toBeVisible();

  // Preencher os dados
  await page.getByPlaceholder('seu@email.com').fill(email);

  await page.locator('input[type="password"]').fill(senha);

  // Clicar no botão do formulário
  await page.getByRole('main').getByRole('button', {
    name: 'Entrar'
  }).click();

  // Confirmar o login
  await expect(page).toHaveURL('http://localhost:3000/');

  await expect(
    page.getByRole('button', { name: 'Sair' })
  ).toBeVisible();
});
