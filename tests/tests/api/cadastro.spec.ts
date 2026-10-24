
import { test, expect } from '@playwright/test';

test('API deve cadastrar um usuario com dados validos', async ({ request }) => {
  const email = `teste-${Date.now()}@example.com`;

  const resposta = await request.post('http://localhost:8081/auth/signup', {
    data: {
      email: email,
      password: 'Abcdef1@x'
    }
  });

  expect(resposta.status()).toBe(200);

  const dados = await resposta.json();

  expect(dados).toHaveProperty('id');
  expect(dados.email).toBe(email);
});
