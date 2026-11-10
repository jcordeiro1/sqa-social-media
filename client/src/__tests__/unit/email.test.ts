import { isEmailValid } from "@/utils/email";

describe("Validação de e-mail", () => {
  test("aceita e-mail válido e rejeita e-mail sem arroba", () => {
    expect(isEmailValid("jacy@example.com")).toBe(true);
    expect(isEmailValid("email-invalido")).toBe(false);
  });
});
