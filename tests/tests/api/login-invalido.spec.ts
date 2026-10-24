
import { test, expect } from '@playwright/test';

test('API deve rejeitar login com credenciais invalidas', async ({ request }) => {
  const resposta = await request.post('http://localhost:8081/auth/signin', {
    data: {
      email: 'usuario-inexistente-987654@example.com',
      password: 'Abcdef1@x'
    }
  });

  expect(resposta.status()).toBe(401);

  const dados = await resposta.json();

  expect(dados.message).toBe('Credenciais inválidas');
});
