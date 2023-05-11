type CellValue = "X" | "O" | "";

export class Cell {
  private value: CellValue;

  private constructor(value: CellValue) {
    this.value = value;
  }

  public static create(): Cell {
    return new Cell("");
  }

  public isEmpty(): boolean {
    return this.value === "";
  }
}
