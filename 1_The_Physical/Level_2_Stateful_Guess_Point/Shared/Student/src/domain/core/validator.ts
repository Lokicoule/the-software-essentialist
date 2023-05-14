export abstract class Validator<Props, ValidationError> {
  public abstract validate(props: Props): ValidationError;
}
