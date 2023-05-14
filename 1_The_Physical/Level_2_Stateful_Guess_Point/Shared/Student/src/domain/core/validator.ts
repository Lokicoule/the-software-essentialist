interface BaseValidationError {
  required?: string;
}
export abstract class Validator<
  Props,
  ValidationError extends BaseValidationError
> {
  protected abstract requiredMessage: string;

  public validate(props: Props): ValidationError {
    return this.validateRequired(props);
  }

  private validateRequired(props: Props): ValidationError {
    const error: ValidationError = {} as ValidationError;

    if (!props) {
      error.required = this.requiredMessage;
    }

    return error;
  }
}
