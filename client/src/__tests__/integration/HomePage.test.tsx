import { render, screen } from "@testing-library/react";
import Home from "@/app/page";
import { postsService } from "@/service/posts/posts";
import { useAuth } from "@/contexts/AuthContext";

jest.mock("@/components/Header", () => () => <div>Header de teste</div>);
jest.mock("@/contexts/AuthContext", () => ({ useAuth: jest.fn() }));
jest.mock("@/service/posts/posts", () => ({
  postsService: { getPosts: jest.fn(), toggleLikePost: jest.fn() },
}));

describe("Feed da página inicial", () => {
  test("mostra post e quantidades de likes e dislikes recebidas do serviço", async () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
    (postsService.getPosts as jest.Mock).mockResolvedValue({
      posts: [{
        id: 1,
        title: "Primeiro post",
        body: "Conteúdo do post",
        liked: false,
        reactions: { likes: 12, dislikes: 2 },
      }],
      total: 1,
      skip: 0,
      limit: 10,
    });

    render(<Home />);

    expect(await screen.findByText("Primeiro post")).toBeTruthy();
    expect(screen.getByLabelText("Likes: 12")).toBeTruthy();
    expect(screen.getByLabelText("Dislikes: 2")).toBeTruthy();
  });
});
