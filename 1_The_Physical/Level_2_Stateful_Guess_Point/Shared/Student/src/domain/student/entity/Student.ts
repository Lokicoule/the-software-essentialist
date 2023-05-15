import { v4 as uuid } from "uuid";

import { EventBus } from "../../../infra/EventBus";
import { Result } from "../../../shared/Result";
import { AggregateRoot } from "../../core/AggregateRoot";
import { FirstNameUpdated, LastNameUpdated, StudentCreated } from "../events";
import { Email, FirstName, LastName } from "../value-objects";
import { FirstNameValidationError } from "../validators/FirstNameValidator";
import { LastNameValidationError } from "../validators/LastNameValidator";
import { EmailValidationError } from "../validators/EmailValidator";

interface StudentProps {
  firstName: string;
  lastName: string;
}

interface StudentState {
  firstName: FirstName;
  lastName: LastName;
  email: Email;
}

interface StudentValidationError {
  firstName?: FirstNameValidationError;
  lastName?: LastNameValidationError;
  email?: EmailValidationError;
}

export class Student implements AggregateRoot<StudentState> {
  public readonly id: string;
  public readonly state: StudentState;

  private constructor(props: StudentState, eventBus?: EventBus) {
    this.id = uuid();
    this.state = props;
    eventBus?.publish(new StudentCreated(this));
  }

  public static create(
    props: StudentProps,
    eventBus?: EventBus
  ): Result<Student, StudentValidationError> {
    const errors: StudentValidationError = {};
    const firstNameResult = FirstName.create(props.firstName);
    const lastNameResult = LastName.create(props.lastName);
    const emailResult = Student.generateEmail(props.firstName, props.lastName);

    if (firstNameResult.isFailure()) {
      errors.firstName = firstNameResult.getError();
    }

    if (lastNameResult.isFailure()) {
      errors.lastName = lastNameResult.getError();
    }

    if (emailResult.isFailure()) {
      errors.email = emailResult.getError();
    }

    if (Object.values(errors).length) {
      return Result.failure(errors);
    }

    return Result.success(
      new Student(
        {
          firstName: firstNameResult.getValue(),
          lastName: lastNameResult.getValue(),
          email: emailResult.getValue(),
        },
        eventBus
      )
    );
  }

  public updateFirstName(
    firstName: string,
    eventBus: EventBus
  ): Result<Student, StudentValidationError> {
    const oldFirstName = this.state.firstName.value;
    const result = Student.create({
      firstName,
      lastName: this.state.lastName.value,
    });

    if (result.isSuccess()) {
      const student = result.getValue();
      eventBus.publish(new FirstNameUpdated(student, oldFirstName, firstName));
    }

    return result;
  }

  public updateLastName(
    lastName: string,
    eventBus: EventBus
  ): Result<Student, StudentValidationError> {
    const oldLastName = this.state.lastName.value;
    const result = Student.create({
      firstName: this.state.firstName.value,
      lastName,
    });

    if (result.isSuccess()) {
      const student = result.getValue();
      eventBus.publish(new LastNameUpdated(student, oldLastName, lastName));
    }

    return result;
  }

  public get email() {
    return this.state.email.value;
  }

  public get firstName() {
    return this.state.firstName.value;
  }

  public get lastName() {
    return this.state.lastName.value;
  }

  private static generateEmail(
    firstName: string,
    lastName: string
  ): Result<Email, EmailValidationError> {
    const firstNamePrefix = firstName.trim().slice(0, 2).toLowerCase();
    const lastNamePrefix = lastName.trim().slice(0, 5).toLowerCase();

    return Email.generate({ local: `${lastNamePrefix}${firstNamePrefix}` });
  }
}
