export class Board {
  private cells: string[][] = [[]];

  constructor() {
    this.cells = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
  }

  public isEmpty(): boolean {
    return this.cells.every((row) => row.every((cell) => cell === ""));
  }

  public getCells(): string[][] {
    return this.cells;
  }

  public setCell(row: number, column: number, value: string): void {
    this.cells[row][column] = value;
  }

  public getCell(row: number, column: number): string {
    return this.cells[row][column];
  }
}
