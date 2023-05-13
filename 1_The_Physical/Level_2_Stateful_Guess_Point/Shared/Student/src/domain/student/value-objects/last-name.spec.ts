import { LastName } from "./last-name";

describe("LastName", () => {
  describe("create", () => {
    it("should fail if value is empty", () => {
      const result = LastName.create("");

      expect(result.isFailure).toBeTruthy();
      expect(result.getError()).toEqual({
        required: "Lastname is required",
      });
    });

    it("should fail if value is less than 2 characters long", () => {
      const result = LastName.create("a");

      expect(result.isFailure).toBeTruthy();
      expect(result.getError()).toEqual({
        min: "Lastname must be at least 2 characters long",
      });
    });

    it("should fail if value is more than 15 characters long", () => {
      const result = LastName.create("a".repeat(16));

      expect(result.isFailure).toBeTruthy();
      expect(result.getError()).toEqual({
        max: "Lastname must be at most 15 characters long",
      });
    });

    it("should fail if value contains non-letter characters", () => {
      const result = LastName.create("a1");

      expect(result.isFailure).toBeTruthy();
      expect(result.getError()).toEqual({
        letters: "Lastname must contain only letters",
      });
    });

    it("should succeed if value is valid", () => {
      const result = LastName.create("iamvalid");

      expect(result.isSuccess).toBeTruthy();
      expect(result.getValue()).toEqual(
        expect.objectContaining({
          value: "iamvalid",
        })
      );
    });
  });

  describe("validate", () => {
    it("should return error if value is empty", () => {
      const result = LastName.validate("");

      expect(result).toEqual({
        required: "Lastname is required",
      });
    });

    it("should return error if value is less than 2 characters long", () => {
      const result = LastName.validate("a");

      expect(result).toEqual({
        min: "Lastname must be at least 2 characters long",
      });
    });

    it("should return error if value is more than 15 characters long", () => {
      const result = LastName.validate("a".repeat(16));

      expect(result).toEqual({
        max: "Lastname must be at most 15 characters long",
      });
    });

    it("should return error if value contains non-letter characters", () => {
      const result = LastName.validate("a1");

      expect(result).toEqual({
        letters: "Lastname must contain only letters",
      });
    });

    it("should return empty object if value is valid", () => {
      const result = LastName.validate("abcddef");

      expect(result).toEqual({});
    });
  });
});
