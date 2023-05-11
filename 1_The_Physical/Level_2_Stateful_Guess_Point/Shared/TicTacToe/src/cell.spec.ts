import { Cell } from "./cell";

describe("Cell", () => {
  describe("when a new cell is created", () => {
    it("should be empty", () => {
      const cell = Cell.create();

      expect(cell.isEmpty()).toBeTruthy();
    });
  });
});
