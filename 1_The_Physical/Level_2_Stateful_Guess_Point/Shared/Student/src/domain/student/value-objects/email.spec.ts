import { Email } from "./email";

describe("Email", () => {
  describe("create", () => {
    it("should fail if value is empty", () => {
      const result = Email.create("");

      expect(result.isFailure).toBeTruthy();
      expect(result.getError()).toEqual({
        required: "Email is required",
      });
    });

    it("should fail if value is not from the domain", () => {
      const result = Email.create("toto@gmail.com");

      expect(result.isFailure).toBeTruthy();
      expect(result.getError()).toEqual({
        domain: "Email must be from 'essentialist.dev' domain",
      });
    });

    it("should succeed if value is valid", () => {
      const result = Email.create("toto@essentialist.dev");

      expect(result.isSuccess).toBeTruthy();
      expect(result.getValue()).toBeInstanceOf(Email);
      expect(result.getValue().value).toBe("toto@essentialist.dev");
    });
  });

  describe("generate", () => {
    it("should fail if local is empty", () => {
      const result = Email.generate({ local: "" });

      expect(result.isFailure).toBeTruthy();
      expect(result.getError()).toEqual({
        required: "Local part of the email is required",
      });
    });

    it("should succeed if local is valid", () => {
      const result = Email.generate({ local: "toto" });

      expect(result.isSuccess).toBeTruthy();
      expect(result.getValue()).toBeInstanceOf(Email);
      expect(result.getValue().value).toBe("toto@essentialist.dev");
    });
  });
});
