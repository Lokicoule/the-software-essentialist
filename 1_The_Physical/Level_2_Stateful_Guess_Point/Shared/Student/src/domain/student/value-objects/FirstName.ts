import { Result } from "../../../shared/Result";
import { ValueObject } from "../../core";
import { FirstNameValidationError, FirstNameValidator } from "../validators";

interface FirstNameProps {
  value: string;
}

export class FirstName extends ValueObject<FirstNameProps> {
  private constructor(props: FirstNameProps) {
    super(props);
  }

  public static create(
    value: string
  ): Result<FirstName, FirstNameValidationError> {
    const errors = new FirstNameValidator().validate(value);

    if (
      Object.values(errors).some((props) => Object.values(props).some(Boolean))
    ) {
      return Result.failure(errors);
    }

    return Result.success(new FirstName({ value }));
  }

  public get value(): string {
    return this.props.value;
  }
}
