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

  describe("when a player plays", () => {
    it("should update the board with the player value", () => {
      const game = new Game();

      game.play(0, 0);

      expect(game.getBoard().getCell(0, 0).getValue()).toEqual("X");
    });

    it("should change the current player", () => {
      const game = new Game();

      game.play(0, 0);

      expect(game.getCurrentPlayer()).toEqual("O");
    });
  });
});
