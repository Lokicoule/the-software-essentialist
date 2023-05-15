import { Result } from "../../../shared/Result";
import { ValueObject } from "../../core";
import {
  EmailValidationError,
  EmailValidator,
} from "../validators/EmailValidator";

interface EmailProps {
  value: string;
}

interface EmailGeneratorProps {
  local: string;
}

export class Email extends ValueObject<EmailProps> {
  public static readonly domain = "essentialist.dev";

  private constructor(props: EmailProps) {
    super(props);
  }

  public static create(value: string): Result<Email, EmailValidationError> {
    const error = new EmailValidator().validate(value);

    if (
      Object.values(error).some((props) => Object.values(props).some(Boolean))
    ) {
      return Result.failure(error);
    }

    return Result.success(new Email({ value }));
  }

  public static generate({
    local,
  }: EmailGeneratorProps): Result<Email, EmailValidationError> {
    if (!local) {
      return Result.failure({
        required: "Local part of the email is required",
      });
    }

    return Email.create(`${local}@${Email.domain}`);
  }

  public get value(): string {
    return this.props.value;
  }
}
