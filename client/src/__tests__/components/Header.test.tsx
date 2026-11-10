import { render, screen } from "@testing-library/react";
import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

jest.mock("@/contexts/AuthContext", () => ({
  useAuth: jest.fn(),
}));

describe("Header", () => {
  test("mostra Entrar e Criar Conta quando não há login", () => {
    (useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      logout: jest.fn(),
    });

    render(<Header />);

    expect(screen.getByText("SQA Social Media")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Entrar" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Criar Conta" })).toBeTruthy();
  });
});
