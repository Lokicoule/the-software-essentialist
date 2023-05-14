import { StringValidator } from "./Validator";

describe("Validator", () => {
  class TestValidator extends StringValidator {
    protected requiredMessage = "Test is required";
    protected pattern = /^[a-zA-Z]+$/;
    protected patternMessage = "Test must contain only letters";
    protected minLength = 4;
    protected minLengthMessage = "Test must be at least 4 characters long";
    protected maxLength = 10;
    protected maxLengthMessage = "Test must be at most 10 characters long";
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

      const result = validator.validate("test");

      expect(result).toEqual({});
    });
  });

  describe("validatePattern", () => {
    it("should return an error if props is not valid", () => {
      const validator = new TestValidator();

      const result = validator.validate("toto1");

      expect(result).toEqual({
        pattern: "Test must contain only letters",
      });
    });

    it("should return an empty object if props is valid", () => {
      const validator = new TestValidator();

      const result = validator.validate("test");

      expect(result).toEqual({});
    });

    it("should trim the value before validating", () => {
      const validator = new TestValidator();

      const result = validator.validate("   test");

      expect(result).toEqual({});
    });
  });

  describe("validateMinLength", () => {
    it("should return an error if props is not valid", () => {
      const validator = new TestValidator();

      const result = validator.validate("a".repeat(3));

      expect(result).toEqual({
        min: "Test must be at least 4 characters long",
      });
    });

    it("should return an empty object if props is valid", () => {
      const validator = new TestValidator();

      const result = validator.validate("test");

      expect(result).toEqual({});
    });

    it("should trim the value before validating", () => {
      const validator = new TestValidator();

      const result = validator.validate("   t");

      expect(result).toEqual({
        min: "Test must be at least 4 characters long",
      });
    });
  });

  describe("validateMaxLength", () => {
    it("should return an error if props is not valid", () => {
      const validator = new TestValidator();

      const result = validator.validate("a".repeat(11));

      expect(result).toEqual({
        max: "Test must be at most 10 characters long",
      });
    });

    it("should return an empty object if props is valid", () => {
      const validator = new TestValidator();

      const result = validator.validate("test");

      expect(result).toEqual({});
    });

    it("should trim the value before validating", () => {
      const validator = new TestValidator();

      const result = validator.validate("      " + "a".repeat(10));

      expect(result).toEqual({});
    });
  });

  describe("optional validation", () => {
    class OptionalTestValidator extends StringValidator {
      protected requiredMessage = "Test is required";
      protected pattern?: RegExp;
      protected patternMessage?: string;
      protected minLength?: number;
      protected minLengthMessage?: string;
      protected maxLength?: number;
      protected maxLengthMessage?: string;
    }

    it("should return an error if props is empty", () => {
      const validator = new OptionalTestValidator();

      const result = validator.validate("");

      expect(result).toEqual({
        required: "Test is required",
      });
    });

    it("should return an empty object if props is valid", () => {
      const validator = new OptionalTestValidator();

      const result = validator.validate("test");

      expect(result).toEqual({});
    });
  });
});
