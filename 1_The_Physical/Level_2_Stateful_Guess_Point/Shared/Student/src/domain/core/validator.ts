export interface ValidationError {
  required?: string;
  pattern?: string;
  min?: string;
  max?: string;
}

export abstract class StringValidator {
  protected abstract requiredMessage?: string;
  protected abstract pattern?: RegExp;
  protected abstract patternMessage?: string;
  protected abstract minLength?: number;
  protected abstract minLengthMessage?: string;
  protected abstract maxLength?: number;
  protected abstract maxLengthMessage?: string;

  public validate(value: string): ValidationError {
    const errors: ValidationError[] = [];

    errors.push(this.validateRequired(value));
    errors.push(this.validatePattern(value));
    errors.push(this.validateMinLength(value));
    errors.push(this.validateMaxLength(value));

    return this.mergeErrors(errors);
  }

  private validateRequired(value: string): ValidationError {
    const error: ValidationError = {} as ValidationError;

    if (!value) {
      error.required = this.requiredMessage;
    }

    return error;
  }

  private validatePattern(value: string): ValidationError {
    const error: ValidationError = {} as ValidationError;

    if (value && this.pattern && !this.pattern.test(value?.trim())) {
      error.pattern = this.patternMessage;
    }

    return error;
  }

  private validateMinLength(value: string): ValidationError {
    const error: ValidationError = {} as ValidationError;

    if (value && this.minLength && value.trim().length < this.minLength) {
      error.min = this.minLengthMessage;
    }

    return error;
  }

  private validateMaxLength(value: string): ValidationError {
    const error: ValidationError = {} as ValidationError;

    if (value && this.maxLength && value.trim().length > this.maxLength) {
      error.max = this.maxLengthMessage;
    }

    return error;
  }

  private mergeErrors(errors: ValidationError[]): ValidationError {
    return errors.reduce((acc, error) => {
      return {
        ...acc,
        ...error,
      };
    }, {} as ValidationError);
  }
}
