import { isPasswordValid, getPasswordValidationMessage } from "@/utils/password";

describe("Validação de senha", () => {
  test("aceita senha forte com exatamente 8 caracteres", () => {
    expect(isPasswordValid("Abcde1@x")).toBe(true);
    expect(getPasswordValidationMessage("Abcde1@x")).toBe("");
  });
});
