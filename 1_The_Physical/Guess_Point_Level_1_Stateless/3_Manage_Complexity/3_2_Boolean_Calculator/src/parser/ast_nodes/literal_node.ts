import { ASTNode } from "./ast_node";

export interface LiteralNode extends ASTNode {
  readonly type: "Literal";
  readonly value: boolean;
}
