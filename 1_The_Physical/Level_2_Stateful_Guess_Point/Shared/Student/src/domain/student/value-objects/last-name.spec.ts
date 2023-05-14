import { LastName } from "./last-name";

describe("LastName", () => {
  describe("create", () => {
    it("should fail if value is empty", () => {
      const result = LastName.create("");

      expect(result.isFailure).toBeTruthy();
      expect(result.getError()).toEqual({
        required: "Last name is required",
      });
    });

    it("should fail if value is less than 2 characters long", () => {
      const result = LastName.create("a");

      expect(result.isFailure).toBeTruthy();
      expect(result.getError()).toEqual({
        min: "Last name must be at least 2 characters long",
      });
    });

    it("should fail if value is more than 15 characters long", () => {
      const result = LastName.create("a".repeat(16));

      expect(result.isFailure).toBeTruthy();
      expect(result.getError()).toEqual({
        max: "Last name must be at most 15 characters long",
      });
    });

    it("should fail if value contains non-letter characters", () => {
      const result = LastName.create("a1");

      expect(result.isFailure).toBeTruthy();
      expect(result.getError()).toEqual({
        pattern: "Last name must contain only letters",
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
});
