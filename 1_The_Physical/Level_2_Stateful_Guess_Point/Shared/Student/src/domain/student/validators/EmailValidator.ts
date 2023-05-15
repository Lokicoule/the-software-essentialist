import { StringValidator, ValidationError } from "../../core";
import { Email } from "../value-objects";

export interface EmailValidationError extends ValidationError {
  domain?: string;
}

export class EmailValidator extends StringValidator {
  protected requiredMessage = "Email is required";
  protected pattern = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  protected patternMessage = "Email is invalid";
  protected maxLength?: number;
  protected maxLengthMessage?: string;
  protected minLength?: number;
  protected minLengthMessage?: string;

  public validate(value: string): EmailValidationError {
    const error = super.validate(value);

    if (!error.required) {
      Object.assign(error, this.validateDomain(value));
    }

    return error;
  }

  private validateDomain(value: string): EmailValidationError {
    const error: EmailValidationError = {};

    if (value && !value.endsWith(Email.domain)) {
      error.domain = `Email must be from '${Email.domain}' domain`;
    }

    return error;
  }
}
