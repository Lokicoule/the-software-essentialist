export interface LastNameValidationError {
  min?: string;
  max?: string;
  letters?: string;
  required?: string;
}

export class LastNameValidator {
  static readonly minLength = 2;
  static readonly maxLength = 15;

  public static validate(value: string): LastNameValidationError {
    const errors: LastNameValidationError = {};

    if (!value) {
      errors.required = "Lastname is required";
    } else {
      value = value.trim();

      if (value.length < LastNameValidator.minLength) {
        errors.min = `Lastname must be at least ${LastNameValidator.minLength} characters long`;
      }

      if (value.length > LastNameValidator.maxLength) {
        errors.max = `Lastname must be at most ${LastNameValidator.maxLength} characters long`;
      }

      if (!/^[a-zA-Z]+$/.test(value)) {
        errors.letters = `Lastname must contain only letters`;
      }
    }

    return errors;
  }
}
