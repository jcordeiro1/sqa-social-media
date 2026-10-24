
import { test, expect } from '@playwright/test';

test('API deve rejeitar cadastro com email invalido', async ({ request }) => {
  const resposta = await request.post('http://localhost:8081/auth/signup', {
    data: {
      email: 'email-invalido',
      password: 'Abcdef1@x'
    }
  });

  expect(resposta.status()).toBe(422);

  const dados = await resposta.json();

  expect(dados.message).toBe('E-mail inválido');
});
