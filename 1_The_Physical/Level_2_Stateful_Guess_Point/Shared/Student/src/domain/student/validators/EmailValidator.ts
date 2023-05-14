import { StringValidator, ValidationError } from "../../core";

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
}
