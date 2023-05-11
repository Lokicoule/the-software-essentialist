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

  getCell(row: number, column: number): string {
    return this.cells[row][column];
  }
}
