import { Result } from "../../../shared/result";
import { ValueObject } from "../../core/value-object";
import {
  LastNameValidationError,
  LastNameValidator,
} from "../validators/last-name-validator";

interface LastNameProps {
  value: string;
}

export class LastName extends ValueObject<LastNameProps> {
  private constructor(props: LastNameProps) {
    super(props);
  }

  public static create(
    value: string
  ): Result<LastName, LastNameValidationError> {
    const errors = LastNameValidator.validate(value);

    if (
      Object.values(errors).some((props) => Object.values(props).some(Boolean))
    ) {
      return Result.failure(errors);
    }

    return Result.success(new LastName({ value }));
  }

  public get value(): string {
    return this.props.value;
  }
}
