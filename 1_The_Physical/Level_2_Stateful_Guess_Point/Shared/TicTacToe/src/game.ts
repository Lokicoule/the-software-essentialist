import { Board } from "./board";
import { CellValue } from "./cell";

export class Game {
  private board: Board;
  private currentPlayer: CellValue;

  constructor() {
    this.board = new Board();
    this.currentPlayer = "X";
  }

  public getBoard(): Board {
    return this.board;
  }

  public getCurrentPlayer(): CellValue {
    return this.currentPlayer;
  }
}
