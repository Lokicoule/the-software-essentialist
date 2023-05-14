import { ValidationError, StringValidator } from "../../core/validator";

export interface FirstNameValidationError extends ValidationError {}

export class FirstNameValidator extends StringValidator {
  protected requiredMessage = "First name is required";
  protected pattern = /^[a-zA-Z]+$/;
  protected patternMessage = "First name must contain only letters";
  protected minLength = 2;
  protected minLengthMessage = "First name must be at least 2 characters long";
  protected maxLength = 10;
  protected maxLengthMessage = "First name must be at most 10 characters long";
}
