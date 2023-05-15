import { Email } from "../value-objects";
import { EmailValidator } from "./EmailValidator";

describe("EmailValidator", () => {
  const validator = new EmailValidator();

  describe("validate", () => {
    it("should return error if email is empty", () => {
      const email = "";
      const result = validator.validate(email);

      expect(result).toEqual({
        required: "Email is required",
      });
    });

    it("should return error if email is invalid", () => {
      const email = "invalid";
      const result = validator.validate(email);

      expect(result).toEqual(
        expect.objectContaining({
          pattern: "Email is invalid",
        })
      );
    });

    it("should return error if email is not from the domain", () => {
      const email = "test@gmail.com";
      const result = validator.validate(email);

      expect(result).toEqual({
        domain: `Email must be from '${Email.domain}' domain`,
      });
    });

    it("should return empty object if email is valid", () => {
      const email = `test@${Email.domain}`;
      const result = validator.validate(email);

      expect(result).toEqual({});
    });
  });
});
