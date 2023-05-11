import { Game } from "./game";

describe("Game", () => {
  describe("when a new game is created", () => {
    it("should have an empty board", () => {
      const game = new Game();

      expect(game.getBoard().isEmpty()).toBeTruthy();
    });

    it("should have the current player as X", () => {
      const game = new Game();

      expect(game.getCurrentPlayer()).toEqual("X");
    });
  });
});
