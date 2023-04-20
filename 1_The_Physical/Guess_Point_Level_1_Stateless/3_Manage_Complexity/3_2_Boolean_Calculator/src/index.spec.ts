import {
  binaryOperatorFunctions,
  parseBooleanValue,
  unaryOperatorFunctions,
  Tokenizer,
  Parser,
} from "./index";

describe("boolean calculator", () => {
  describe("parseBooleanValue", () => {
    it("should return true for 'true'", () => {
      expect(parseBooleanValue("true")).toBeTruthy();
    });

    it("should return false for 'false'", () => {
      expect(parseBooleanValue("false")).toBeFalsy();
    });

    it("should throw an error for 'foo'", () => {
      expect(() => parseBooleanValue("foo")).toThrowError(
        "Invalid boolean value"
      );
    });
  });

  describe("unaryOperatorFunctions", () => {
    it("should return the NOT function for 'NOT'", () => {
      expect(unaryOperatorFunctions["NOT"]).toBeDefined();
    });

    it("should return true for NOT(false)", () => {
      expect(unaryOperatorFunctions["NOT"](false)).toBeTruthy();
    });

    it("should return false for NOT(true)", () => {
      expect(unaryOperatorFunctions["NOT"](true)).toBeFalsy();
    });
  });

  describe("binaryOperatorFunctions", () => {
    describe("AND", () => {
      it("should return the AND function for 'AND'", () => {
        expect(binaryOperatorFunctions["AND"]).toBeDefined();
      });

      it("should return true for true AND true", () => {
        expect(binaryOperatorFunctions["AND"](true, true)).toBeTruthy();
      });

      it("should return false for true AND false", () => {
        expect(binaryOperatorFunctions["AND"](true, false)).toBeFalsy();
      });

      it("should return false for false AND true", () => {
        expect(binaryOperatorFunctions["AND"](false, true)).toBeFalsy();
      });

      it("should return false for false AND false", () => {
        expect(binaryOperatorFunctions["AND"](false, false)).toBeFalsy();
      });
    });

    describe("OR", () => {
      it("should return the OR function for 'OR'", () => {
        expect(binaryOperatorFunctions["OR"]).toBeDefined();
      });

      it("should return true for true OR true", () => {
        expect(binaryOperatorFunctions["OR"](true, true)).toBeTruthy();
      });

      it("should return true for true OR false", () => {
        expect(binaryOperatorFunctions["OR"](true, false)).toBeTruthy();
      });

      it("should return true for false OR true", () => {
        expect(binaryOperatorFunctions["OR"](false, true)).toBeTruthy();
      });

      it("should return false for false OR false", () => {
        expect(binaryOperatorFunctions["OR"](false, false)).toBeFalsy();
      });
    });
  });

  describe("Tokenizer", () => {
    it("should tokenize a simple expression", () => {
      expect(new Tokenizer("true AND false OR TRUE").tokenize()).toEqual([
        "true",
        "AND",
        "false",
        "OR",
        "TRUE",
      ]);
    });

    it("should tokenize a simple expression with parenthesis", () => {
      expect(new Tokenizer("NOT (true AND false)").tokenize()).toEqual([
        "NOT",
        ["true", "AND", "false"],
      ]);
    });
  });

  describe("AST Parser", () => {
    describe("Parser.parseValue", () => {
      it("should parse a single value", () => {
        expect(new Parser(["TRUE"]).parse()).toEqual({
          type: "Literal",
          value: true,
        });
        expect(new Parser(["FALSE"]).parse()).toEqual({
          type: "Literal",
          value: false,
        });
      });

      it('should throw an error "Invalid expression: Boolean value should be separated by binary operator"', () => {
        expect(() => new Parser(["TRUE", "FALSE"]).parse()).toThrowError(
          "Invalid expression: Boolean value should be separated by binary operator"
        );
      });

      it("should thow an expected error", () => {
        expect(() => new Parser(["Invalid"]).parse()).toThrowError(
          "Unexpected token"
        );
      });
    });

    describe("Parser.parseUnary", () => {
      it("should parse a single unary expression", () => {
        expect(new Parser(["NOT", "TRUE"]).parse()).toEqual({
          type: "UnaryExpression",
          operator: "NOT",
          argument: {
            type: "Literal",
            value: true,
          },
        });
        expect(new Parser(["NOT", "FALSE"]).parse()).toEqual({
          type: "UnaryExpression",
          operator: "NOT",
          argument: {
            type: "Literal",
            value: false,
          },
        });
      });
    });

    describe("Parser.parseBinary", () => {
      it("should parse a simple expression", () => {
        expect(new Parser(["TRUE", "AND", "FALSE"]).parse()).toEqual({
          type: "BinaryExpression",
          operator: "AND",
          left: {
            type: "Literal",
            value: true,
          },
          right: {
            type: "Literal",
            value: false,
          },
        });
      });

      it("should parse a complex expression", () => {
        expect(
          new Parser(["TRUE", "AND", "FALSE", "OR", "NOT", "TRUE"]).parse()
        ).toEqual({
          type: "BinaryExpression",
          operator: "OR",
          left: {
            type: "BinaryExpression",
            operator: "AND",
            left: {
              type: "Literal",
              value: true,
            },
            right: {
              type: "Literal",
              value: false,
            },
          },
          right: {
            type: "UnaryExpression",
            operator: "NOT",
            argument: {
              type: "Literal",
              value: true,
            },
          },
        });
      });
    });

    it("should throw 'Unexpected token' Error", () => {
      expect(() => new Parser(["TRUE", "AND"]).parse()).toThrowError(
        "Unexpected token"
      );
    });

    it("should throw 'Invalid expression: Boolean value should be separated by binary operator' Error", () => {
      expect(() => new Parser(["TRUE", "TRUE"]).parse()).toThrowError(
        "Invalid expression: Boolean value should be separated by binary operator"
      );
    });
  });
});
