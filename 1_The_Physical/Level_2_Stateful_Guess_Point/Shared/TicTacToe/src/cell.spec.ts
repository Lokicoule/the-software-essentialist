import { Cell } from "./cell";

describe("Cell", () => {
  describe("when a new cell is created", () => {
    it("should be empty", () => {
      const cell = Cell.create();

      expect(cell.isEmpty()).toBeTruthy();
    });
  });

  describe("when a cell is set with a value", () => {
    it("should not be empty", () => {
      const cell = Cell.create();

      cell.setValue("X");

      expect(cell.isEmpty()).toBeFalsy();
    });
  });
});
