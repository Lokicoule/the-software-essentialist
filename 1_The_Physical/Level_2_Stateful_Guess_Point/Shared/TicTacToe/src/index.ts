export class Board {
  private cells: string[][] = [[]];

  constructor() {
    this.cells = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
  }

  getCells(): string[][] {
    return this.cells;
  }

  setCell(row: number, column: number, value: string): void {
    this.cells[row][column] = value;
  }
}
