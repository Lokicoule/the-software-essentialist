import { Cell, CellValue } from "./cell";

export class Board {
  private cells: Cell[][] = [[]];

  constructor() {
    this.cells = [
      [Cell.create(), Cell.create(), Cell.create()],
      [Cell.create(), Cell.create(), Cell.create()],
      [Cell.create(), Cell.create(), Cell.create()],
    ];
  }

  public isEmpty(): boolean {
    return this.cells.every((row) => row.every((cell) => cell.isEmpty()));
  }

  public isFull(): boolean {
    return this.cells.every((row) => row.every((cell) => !cell.isEmpty()));
  }

  public getCells(): Cell[][] {
    return this.cells;
  }

  public setCell(row: number, column: number, value: CellValue): void {
    this.cells[row][column].setValue(value);
  }

  public getCell(row: number, column: number): Cell {
    return this.cells[row][column];
  }
}
