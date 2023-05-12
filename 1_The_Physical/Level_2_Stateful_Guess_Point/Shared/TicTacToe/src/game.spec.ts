import { Game } from "./game";

describe("Game", () => {
  describe("when a new game is created", () => {
    it("should have an empty board", () => {
      const game = new Game();

      expect(game.getBoard().isEmpty()).toBeTruthy();
    });

    it("should have the current player as X", () => {
      const game = new Game();

      expect(game.getCurrentPlayer().getMark()).toEqual("X");
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

      expect(game.getCurrentPlayer().getMark()).toEqual("O");
    });

    it("should not update the board when the cell is not empty", () => {
      const game = new Game();

      game.play(0, 0);
      game.play(0, 0);

      expect(game.getBoard().getCell(0, 0).getValue()).toEqual("X");
    });
  });

  describe("when the game is over", () => {
    it("should be over when the board is full", () => {
      const game = new Game();

      game.play(0, 0);
      game.play(0, 1);
      game.play(0, 2);
      game.play(1, 0);
      game.play(1, 1);
      game.play(1, 2);
      game.play(2, 0);
      game.play(2, 1);
      game.play(2, 2);

      expect(game.isOver()).toBeTruthy();
    });
  });
});
