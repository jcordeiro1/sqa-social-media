import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import SignUp from "@/app/signup/page";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { authService } from "@/service/auth/auth";

jest.mock("next/navigation", () => ({ useRouter: jest.fn() }));
jest.mock("@/contexts/AuthContext", () => ({ useAuth: jest.fn() }));
jest.mock("@/service/auth/auth", () => ({
  authService: { signUp: jest.fn() },
}));
jest.mock("@/components/Header", () => () => <div>Header de teste</div>);

describe("Fluxo de cadastro da tela", () => {
  test("envia o formulário, autentica e redireciona", async () => {
    const push = jest.fn();
    const login = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push });
    (useAuth as jest.Mock).mockReturnValue({ login });
    (authService.signUp as jest.Mock).mockResolvedValue({
      id: 7,
      email: "jacy@example.com",
    });

    render(<SignUp />);
    fireEvent.change(screen.getByPlaceholderText("seu@email.com"), {
      target: { value: "jacy@example.com" },
    });
    const senhas = screen.getAllByPlaceholderText("••••••••");
    fireEvent.change(senhas[0], { target: { value: "Abcdef1@x" } });
    fireEvent.change(senhas[1], { target: { value: "Abcdef1@x" } });
    fireEvent.click(screen.getByRole("button", { name: "Criar Conta" }));

    await waitFor(() => {
      expect(authService.signUp).toHaveBeenCalledWith({
        email: "jacy@example.com",
        password: "Abcdef1@x",
      });
      expect(login).toHaveBeenCalledWith({ id: 7, email: "jacy@example.com" });
      expect(push).toHaveBeenCalledWith("/");
    });
  });
});
