import { fireEvent, render, screen } from "@testing-library/react";
import PostCard from "@/components/PostCard";

describe("PostCard", () => {
  test("avisa quando alguém sem login tenta curtir", () => {
    const onLike = jest.fn().mockResolvedValue(undefined);
    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

    try {
      render(
        <PostCard
          post={{
            id: 1,
            title: "Post teste",
            body: "Conteúdo de teste",
            liked: false,
            reactions: { likes: 5, dislikes: 1 },
          }}
          isAuthenticated={false}
          onLike={onLike}
        />
      );

      fireEvent.click(screen.getByRole("button", { name: /Curtir/i }));
      expect(alertSpy).toHaveBeenCalledWith(
        "Você precisa estar autenticado para curtir posts!"
      );
      expect(onLike).not.toHaveBeenCalled();
    } finally {
      alertSpy.mockRestore();
    }
  });
});
