import { CellValue } from "./cell";
import { Board } from "./board";

describe("Board", () => {
  describe("when a new board is created", () => {
    it("should have a 3x3 empty grid", () => {
      const board = new Board();

      expect(board.isEmpty()).toBeTruthy();
    });
  });

  it.each([
    [0, 0, "X"],
    [1, 2, "O"],
  ])("should update the cell value position (%i, %i)", (row, column, value) => {
    const board = new Board();

    board.setCell(row, column, value as CellValue);

    expect(board.getCell(row, column).getValue()).toEqual(value);
  });
});
