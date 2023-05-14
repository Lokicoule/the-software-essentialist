import { Validator } from "./validator";

describe("Validator", () => {
  class TestValidator extends Validator<
    { test: string },
    { required: string }
  > {
    protected requiredMessage = "Test is required";
  }

  describe("validate", () => {
    it("should return an error if props is empty", () => {
      const validator = new TestValidator();

      const result = validator.validate(null as any);

      expect(result).toEqual({
        required: "Test is required",
      });
    });

    it("should return an empty object if props is valid", () => {
      const validator = new TestValidator();

      const result = validator.validate({ test: "test" });

      expect(result).toEqual({});
    });
  });
});
