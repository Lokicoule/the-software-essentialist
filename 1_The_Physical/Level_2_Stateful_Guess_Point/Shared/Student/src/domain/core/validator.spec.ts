import { Validator } from "./validator";

describe("Validator", () => {
  class TestValidator extends Validator<
    { value: string },
    { required: string }
  > {
    protected requiredMessage = "Test is required";
    protected pattern = /^[a-zA-Z]+$/;
    protected patternMessage = "Test must contain only letters";
    protected minLength = 4;
    protected minLengthMessage = "Test must be at least 4 characters long";
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

      const result = validator.validate({ value: "toto1" });

      expect(result).toEqual({
        pattern: "Test must contain only letters",
      });
    });

    it("should return an empty object if props is valid", () => {
      const validator = new TestValidator();

      const result = validator.validate({ value: "test" });

      expect(result).toEqual({});
    });
  });

  describe("validateMinLength", () => {
    it("should return an error if props is not valid", () => {
      const validator = new TestValidator();

      const result = validator.validate({ value: "tes" });

      expect(result).toEqual({
        min: "Test must be at least 4 characters long",
      });
    });

    it("should return an empty object if props is valid", () => {
      const validator = new TestValidator();

      const result = validator.validate({ value: "test" });

      expect(result).toEqual({});
    });
  });
});
