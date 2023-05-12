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

  it("should be full when all cells are filled", () => {
    const board = new Board();

    board.setCell(0, 0, "X");
    board.setCell(0, 1, "O");
    board.setCell(0, 2, "X");
    board.setCell(1, 0, "O");
    board.setCell(1, 1, "X");
    board.setCell(1, 2, "O");
    board.setCell(2, 0, "X");
    board.setCell(2, 1, "O");
    board.setCell(2, 2, "X");

    expect(board.isFull()).toBeTruthy();
  });

  it("should not update the cell value when the cell is not empty", () => {
    const board = new Board();

    board.setCell(0, 0, "X");
    board.setCell(0, 0, "O");

    expect(board.getCell(0, 0).getValue()).toEqual("X");
  });
});
