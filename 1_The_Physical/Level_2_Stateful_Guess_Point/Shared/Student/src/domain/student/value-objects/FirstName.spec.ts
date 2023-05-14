import { FirstName } from "./FirstName";

describe("FirstName", () => {
  it("should fail if value is empty", () => {
    const result = FirstName.create("");

    expect(result.isFailure).toBeTruthy();
    expect(result.getError()).toEqual({
      required: "First name is required",
    });
  });

  it("should fail if value is less than 2 characters long", () => {
    const result = FirstName.create("a");

    expect(result.isFailure).toBeTruthy();
    expect(result.getError()).toEqual({
      min: "First name must be at least 2 characters long",
    });
  });

  it("should fail if value is more than 10 characters long", () => {
    const result = FirstName.create("abcdefghijk");

    expect(result.isFailure).toBeTruthy();
    expect(result.getError()).toEqual({
      max: "First name must be at most 10 characters long",
    });
  });

  it("should fail if value contains non-letters", () => {
    const result = FirstName.create("John123");

    expect(result.isFailure).toBeTruthy();
    expect(result.getError()).toEqual({
      pattern: "First name must contain only letters",
    });
  });

  it("should succeed if value is valid", () => {
    const result = FirstName.create("John");

    expect(result.isSuccess).toBeTruthy();
    expect(result.getValue().value).toBe("John");
  });
});
