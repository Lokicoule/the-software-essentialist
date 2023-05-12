import { Player } from "./player";

describe("Player", () => {
  describe("when creating a player", () => {
    it("should create a player with mark X", () => {
      const player = Player.createX();

      expect(player.getMark()).toEqual("X");
    });

    it("should create a player with mark O", () => {
      const player = Player.createO();

      expect(player.getMark()).toEqual("O");
    });
  });
});
