import { FirstNameValidator } from "./first-name-validator";

describe("FirstNameValidator", () => {
  it("should fail if value is empty", () => {
    const result = FirstNameValidator.validate("");

    expect(result).toEqual({
      required: "Firstname is required",
    });
  });

  it("should fail if value is less than 2 characters long", () => {
    const result = FirstNameValidator.validate("a");

    expect(result).toEqual({
      min: "Firstname must be at least 2 characters long",
    });
  });

  it("should fail if value is more than 10 characters long", () => {
    const result = FirstNameValidator.validate("abcdefghijk");

    expect(result).toEqual({
      max: "Firstname must be at most 10 characters long",
    });
  });

  it("should fail if value contains non-letters", () => {
    const result = FirstNameValidator.validate("John123");

    expect(result).toEqual({
      letters: "Firstname must contain only letters",
    });
  });

  it("should succeed if value is valid", () => {
    const result = FirstNameValidator.validate("John");

    expect(result).toEqual({});
  });
});
