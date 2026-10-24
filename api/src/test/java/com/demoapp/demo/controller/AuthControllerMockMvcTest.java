package com.demoapp.demo.controller;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.demoapp.demo.model.User;
import com.demoapp.demo.service.UserService;

import static org.mockito.Mockito.mock;

class AuthControllerMockMvcTest {

  private MockMvc mockMvc;
  private UserService userService;

  @BeforeEach
  void setUp() {
    userService = mock(UserService.class);
    mockMvc = MockMvcBuilders.standaloneSetup(new AuthController(userService)).build();
  }

  @Test
  void shouldReturnRequiredMessageWhenEmailIsAlreadyRegistered() throws Exception {
    String email = "jacy@example.com";
    String password = "Abcde1@x";

    User existingUser = new User();
    existingUser.setId(1L);
    existingUser.setEmail(email);
    existingUser.setPassword(password);

    when(userService.isEmailValid(email)).thenReturn(true);
    when(userService.isPasswordValid(password)).thenReturn(true);
    when(userService.findByEmail(email)).thenReturn(existingUser);

    mockMvc.perform(post("/auth/signup")
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\"email\":\"" + email + "\",\"password\":\"" + password + "\"}"))
        .andExpect(status().isConflict())
        // BUG INTENCIONAL: o requisito exige exatamente "E-mail já cadastrado".
        .andExpect(jsonPath("$.message").value("E-mail já cadastrado"));
  }

  @Test
  void shouldReturnInvalidCredentialsForWrongPassword() throws Exception {
    String email = "jacy@example.com";

    User existingUser = new User();
    existingUser.setId(1L);
    existingUser.setEmail(email);
    existingUser.setPassword("SenhaCorreta1@");

    when(userService.isEmailValid(email)).thenReturn(true);
    when(userService.isPasswordValid("SenhaErrada1@")).thenReturn(true);
    when(userService.findByEmail(email)).thenReturn(existingUser);

    mockMvc.perform(post("/auth/signin")
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\"email\":\"" + email + "\",\"password\":\"SenhaErrada1@\"}"))
        .andExpect(status().isUnauthorized())
        .andExpect(jsonPath("$.message").value("Credenciais inválidas"));
  }
}
