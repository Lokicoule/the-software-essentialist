export interface FirstNameValidationError {
  min?: string;
  max?: string;
  letters?: string;
  required?: string;
}

export class FirstNameValidator {
  static readonly minLength = 2;
  static readonly maxLength = 10;

  public static validate(value: string): FirstNameValidationError {
    const errors: FirstNameValidationError = {};

    if (!value) {
      errors.required = "Firstname is required";
    } else {
      value = value.trim();

      if (value.length < FirstNameValidator.minLength) {
        errors.min = `Firstname must be at least ${FirstNameValidator.minLength} characters long`;
      }

      if (value.length > FirstNameValidator.maxLength) {
        errors.max = `Firstname must be at most ${FirstNameValidator.maxLength} characters long`;
      }

      if (!/^[a-zA-Z]+$/.test(value)) {
        errors.letters = `Firstname must contain only letters`;
      }
    }

    return errors;
  }
}
