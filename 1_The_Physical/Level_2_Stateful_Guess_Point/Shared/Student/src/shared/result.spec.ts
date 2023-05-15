import { Result } from "./Result";

describe("Result", () => {
  describe("success", () => {
    it.each([
      [1],
      [true],
      [false],
      [null],
      [undefined],
      ["string"],
      [{}],
      [{ a: 1 }],
      [[]],
    ])("should create a success result with value %p", (value) => {
      const result = Result.success(value);

      expect(result.isSuccess()).toBeTruthy();
      expect(result.isFailure()).toBeFalsy();
      expect(result.getValue()).toBe(value);
    });
  });

  describe("failure", () => {
    it.each([
      [1],
      [true],
      [false],
      [null],
      [undefined],
      ["string"],
      [{}],
      [{ a: 1 }],
      [[]],
      [new Error("error")],
    ])("should create a failure result with error %p", (error) => {
      const result = Result.failure(error);

      expect(result.isSuccess()).toBeFalsy();
      expect(result.isFailure()).toBeTruthy();
      expect(result.getError()).toBe(error);
    });
  });
});
