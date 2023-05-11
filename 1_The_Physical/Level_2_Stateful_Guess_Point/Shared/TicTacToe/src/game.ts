import { Board } from "./board";

export class Game {
  private board: Board;

  constructor() {
    this.board = new Board();
  }

  public getBoard(): Board {
    return this.board;
  }
}
