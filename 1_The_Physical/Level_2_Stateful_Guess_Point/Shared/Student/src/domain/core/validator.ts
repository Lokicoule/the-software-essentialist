interface BaseValidationError {
  required?: string;
  pattern?: string;
  min?: string;
}

interface BaseProps {
  value: string;
}

export abstract class Validator<
  Props extends BaseProps,
  ValidationError extends BaseValidationError
> {
  protected abstract requiredMessage: string;
  protected abstract pattern: RegExp;
  protected abstract patternMessage: string;
  protected abstract minLength: number;
  protected abstract minLengthMessage: string;

  public validate(props: Props): ValidationError {
    const errors: ValidationError[] = [];

    errors.push(this.validateRequired(props));
    errors.push(this.validatePattern(props));
    errors.push(this.validateMinLength(props));

    console.log(errors);

    return this.mergeErrors(errors);
  }

  private validateRequired(props: Props): ValidationError {
    const error: ValidationError = {} as ValidationError;

    if (!props?.value) {
      error.required = this.requiredMessage;
    }

    return error;
  }

  private validatePattern(props: Props): ValidationError {
    const error: ValidationError = {} as ValidationError;

    if (props?.value && !this.pattern.test(props.value)) {
      console.log(this.pattern);
      error.pattern = this.patternMessage;
    }

    console.log(error);

    return error;
  }

  private validateMinLength(props: Props): ValidationError {
    const error: ValidationError = {} as ValidationError;

    if (props?.value && props.value.length < this.minLength) {
      error.min = this.minLengthMessage;
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
