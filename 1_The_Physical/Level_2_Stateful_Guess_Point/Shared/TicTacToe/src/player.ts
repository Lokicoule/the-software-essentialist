export type Mark = "X" | "O";

export class Player {
  private mark: Mark;

  private constructor(mark: Mark) {
    this.mark = mark;
  }

  public static createX(): Player {
    return new Player("X");
  }

  public static createO(): Player {
    return new Player("O");
  }

  public getMark(): Mark {
    return this.mark;
  }
}
