interface BaseValidationError {
  required?: string;
  pattern?: string;
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

  public validate(props: Props): ValidationError {
    let error = this.validateRequired(props);

    if (!error.required) {
      error = this.validatePattern(props);
    }

    return error;
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

    if (!this.pattern.test(props.value)) {
      error.pattern = this.patternMessage;
    }

    return error;
  }
}
