class Success<T> {
  public readonly isSuccess = true;
  public readonly isFailure = false;

  constructor(private readonly value: T) {}

  public getValue(): T {
    return this.value;
  }
}

class Failure<E> {
  public readonly isSuccess = false;
  public readonly isFailure = true;

  constructor(private readonly error: E) {}

  public getError(): E {
    return this.error;
  }
}

export class Result<T, E> {
  private constructor(private readonly result: Success<T> | Failure<E>) {}

  public static success<T>(value: T): Result<T, never> {
    return new Result(new Success(value));
  }

  public static failure<E>(error: E): Result<never, E> {
    return new Result(new Failure(error));
  }

  public isSuccess(): boolean {
    return this.result.isSuccess;
  }

  public isFailure(): boolean {
    return this.result.isFailure;
  }

  public getValue(): T {
    if (this.result.isFailure) {
      throw new Error(
        "Can't get the value of an error result. Use 'getError' instead."
      );
    }

    return this.result.getValue();
  }

  public getError(): E {
    if (this.result.isSuccess) {
      throw new Error(
        "Can't get the error of a success result. Use 'getValue' instead."
      );
    }

    return this.result.getError();
  }
}
