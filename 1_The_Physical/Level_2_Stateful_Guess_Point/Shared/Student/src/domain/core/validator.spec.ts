import { Validator } from "./validator";

describe("Validator", () => {
  class TestValidator extends Validator<
    { value: string },
    { required: string }
  > {
    protected requiredMessage = "Test is required";
    protected pattern = /^test$/;
    protected patternMessage = "Test must be equal to test";
  }

  describe("validateRequired", () => {
    it("should return an error if props is empty", () => {
      const validator = new TestValidator();

      const result = validator.validate(null as any);

      expect(result).toEqual({
        required: "Test is required",
      });
    });

    it("should return an empty object if props is valid", () => {
      const validator = new TestValidator();

      const result = validator.validate({ value: "test" });

      expect(result).toEqual({});
    });
  });

  describe("validatePattern", () => {
    it("should return an error if props is not valid", () => {
      const validator = new TestValidator();

      const result = validator.validate({ value: "toto" });

      expect(result).toEqual({
        pattern: "Test must be equal to test",
      });
    });

    it("should return an empty object if props is valid", () => {
      const validator = new TestValidator();

      const result = validator.validate({ value: "test" });

      expect(result).toEqual({});
    });
  });
});
