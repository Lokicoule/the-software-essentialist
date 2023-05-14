import { LastNameValidator } from "./last-name-validator";

describe("LastNameValidator", () => {
  let lastNameValidator: LastNameValidator;

  beforeEach(() => {
    lastNameValidator = new LastNameValidator();
  });

  it("should return error if value is empty", () => {
    const result = lastNameValidator.validate("");

    expect(result).toEqual({
      required: "Last name is required",
    });
  });

  it("should return error if value is less than 2 characters long", () => {
    const result = lastNameValidator.validate("a");

    expect(result).toEqual({
      min: "Last name must be at least 2 characters long",
    });
  });

  it("should return error if value is more than 15 characters long", () => {
    const result = lastNameValidator.validate("a".repeat(16));

    expect(result).toEqual({
      max: "Last name must be at most 15 characters long",
    });
  });

  it("should return error if value contains non-letter characters", () => {
    const result = lastNameValidator.validate("a1");

    expect(result).toEqual({
      pattern: "Last name must contain only letters",
    });
  });

  it("should return empty object if value is valid", () => {
    const result = lastNameValidator.validate("abcddef");

    expect(result).toEqual({});
  });
});
