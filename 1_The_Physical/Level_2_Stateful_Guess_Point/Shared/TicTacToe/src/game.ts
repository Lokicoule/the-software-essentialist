import { Board } from "./board";
import { CellValue } from "./cell";

export class Game {
  private board: Board;
  private currentPlayer: CellValue;

  constructor() {
    this.board = new Board();
    this.currentPlayer = "X";
  }

  public play(row: number, column: number): void {
    this.board.setCell(row, column, this.currentPlayer);
    this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
  }

  public getBoard(): Board {
    return this.board;
  }

  public getCurrentPlayer(): CellValue {
    return this.currentPlayer;
  }
}
