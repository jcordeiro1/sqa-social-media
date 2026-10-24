package com.demoapp.demo.service;

import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;

class UserServiceValidationTest {

  private final UserService service = new UserService(null);

  @Test
  void shouldAcceptValidEmail() {
    assertTrue(service.isEmailValid("jacy@example.com"));
  }

  @Test
  void shouldAcceptStrongPasswordWithExactlyEightCharacters() {
    // Requisito: mínimo de 8 caracteres, com maiúscula, minúscula, número e especial.
    assertTrue(service.isPasswordValid("Abcde1@x"));
  }
}
