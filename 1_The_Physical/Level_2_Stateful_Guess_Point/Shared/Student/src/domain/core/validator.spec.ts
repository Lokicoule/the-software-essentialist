import { Validator } from "./validator";

describe("Validator", () => {
  describe("validate", () => {
    it("should return validation error", () => {
      class ValidatorMock extends Validator<{}, { value: string }> {
        public validate(): { value: string } {
          return {
            value: "Value is required",
          };
        }
      }

      const validator = new ValidatorMock();

      const result = validator.validate();

      expect(result).toEqual({
        value: "Value is required",
      });
    });
  });
});
