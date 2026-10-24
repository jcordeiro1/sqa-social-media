
import { test, expect } from '@playwright/test';

test('API deve retornar a lista de posts', async ({ request }) => {
  const resposta = await request.get('http://localhost:8081/posts');

  expect(resposta.status()).toBe(200);

  const dados = await resposta.json();

  expect(Array.isArray(dados.posts)).toBe(true);
  expect(dados.posts.length).toBeGreaterThan(0);

  expect(dados.posts[0]).toHaveProperty('id');
  expect(dados.posts[0]).toHaveProperty('title');
  expect(dados.posts[0]).toHaveProperty('body');
  expect(typeof dados.posts[0].reactions?.likes).toBe('number');
  expect(typeof dados.posts[0].reactions?.dislikes).toBe('number');
});
