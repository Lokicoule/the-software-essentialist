import { FirstNameValidator } from "./first-name-validator";

describe("FirstNameValidator", () => {
  let firstNameValidator: FirstNameValidator;

  beforeEach(() => {
    firstNameValidator = new FirstNameValidator();
  });

  it("should fail if value is empty", () => {
    const result = firstNameValidator.validate("");

    expect(result).toEqual({
      required: "First name is required",
    });
  });

  it("should fail if value is less than 2 characters long", () => {
    const result = firstNameValidator.validate("a");

    expect(result).toEqual({
      min: "First name must be at least 2 characters long",
    });
  });

  it("should fail if value is more than 10 characters long", () => {
    const result = firstNameValidator.validate("abcdefghijk");

    expect(result).toEqual({
      max: "First name must be at most 10 characters long",
    });
  });

  it("should fail if value contains non-letters", () => {
    const result = firstNameValidator.validate("John123");

    expect(result).toEqual({
      pattern: "First name must contain only letters",
    });
  });

  it("should succeed if value is valid", () => {
    const result = firstNameValidator.validate("John");

    expect(result).toEqual({});
  });
});
