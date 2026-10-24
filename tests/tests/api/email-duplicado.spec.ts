
import { test, expect } from '@playwright/test';

test('API deve impedir cadastro com email duplicado', async ({ request }) => {
  const usuario = {
    email: `duplicado-${Date.now()}@example.com`,
    password: 'Abcdef1@x'
  };

  const primeiroCadastro = await request.post(
    'http://localhost:8081/auth/signup',
    { data: usuario }
  );

  expect(primeiroCadastro.status()).toBe(200);

  const segundoCadastro = await request.post(
    'http://localhost:8081/auth/signup',
    { data: usuario }
  );

  expect(segundoCadastro.status()).toBe(409);

  const dados = await segundoCadastro.json();

  expect(dados.message).toBe('E-mail já cadastrado');
});
