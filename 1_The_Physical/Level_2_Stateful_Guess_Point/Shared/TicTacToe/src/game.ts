import { Board } from "./board";
import { Player } from "./player";

export class Game {
  private board: Board;
  private players: Player[];
  private currentPlayer: Player;

  constructor() {
    this.board = new Board();
    this.players = [Player.createX(), Player.createO()];
    this.currentPlayer = this.players[0];
  }

  public play(row: number, column: number): void {
    this.board.setCell(row, column, this.currentPlayer.getMark());
    this.currentPlayer =
      this.currentPlayer === this.players[0]
        ? this.players[1]
        : this.players[0];
  }

  public getBoard(): Board {
    return this.board;
  }

  public getCurrentPlayer(): Player {
    return this.currentPlayer;
  }
}
