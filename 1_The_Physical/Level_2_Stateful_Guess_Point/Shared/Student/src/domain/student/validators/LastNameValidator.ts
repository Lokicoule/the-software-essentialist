import { ValidationError, StringValidator } from "../../core/Validator";

export interface LastNameValidationError extends ValidationError {}

export class LastNameValidator extends StringValidator {
  protected requiredMessage = "Last name is required";
  protected pattern = /^[a-zA-Z]+$/;
  protected patternMessage = "Last name must contain only letters";
  protected minLength = 2;
  protected minLengthMessage = "Last name must be at least 2 characters long";
  protected maxLength = 15;
  protected maxLengthMessage = "Last name must be at most 15 characters long";
}
