import { Result } from "../../../shared/Result";
import { ValueObject } from "../../core";
import { LastNameValidationError, LastNameValidator } from "../validators";

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
    const errors = new LastNameValidator().validate(value);

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
