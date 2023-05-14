import { LastNameValidator } from "./last-name-validator";

describe("LastNameValidator", () => {
  it("should return error if value is empty", () => {
    const result = LastNameValidator.validate("");

    expect(result).toEqual({
      required: "Lastname is required",
    });
  });

  it("should return error if value is less than 2 characters long", () => {
    const result = LastNameValidator.validate("a");

    expect(result).toEqual({
      min: "Lastname must be at least 2 characters long",
    });
  });

  it("should return error if value is more than 15 characters long", () => {
    const result = LastNameValidator.validate("a".repeat(16));

    expect(result).toEqual({
      max: "Lastname must be at most 15 characters long",
    });
  });

  it("should return error if value contains non-letter characters", () => {
    const result = LastNameValidator.validate("a1");

    expect(result).toEqual({
      letters: "Lastname must contain only letters",
    });
  });

  it("should return empty object if value is valid", () => {
    const result = LastNameValidator.validate("abcddef");

    expect(result).toEqual({});
  });
});
