import { v4 as uuid } from "uuid";

import {
  Email,
  EmailValidationError,
  FirstName,
  FirstNameValidationError,
  LastName,
  LastNameValidationError,
} from "../value-objects";
import { Result } from "../../../shared/result";
import { AggregateRoot } from "../../core/aggregate-root";
import { DomainEvent } from "../../core/domain-event";
import { StudentCreated } from "../events/student-created";
import { FirstNameUpdated } from "../events/first-name-updated";
import { LastNameUpdated } from "../events/last-name-updated";

interface StudentInputProps {
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
  public readonly events: DomainEvent[] = [];

  private constructor(props: StudentState) {
    this.id = uuid();
    this.state = props;
    this.events.push(new StudentCreated(this));
  }

  public static create(
    props: StudentInputProps
  ): Result<Student, StudentValidationError> {
    const errors: StudentValidationError = {};
    const firstNameResult = FirstName.create(props.firstName);
    const lastNameResult = LastName.create(props.lastName);
    const emailResult = Student.generateEmail(props.firstName, props.lastName);

    if (
      firstNameResult.isSuccess() &&
      lastNameResult.isSuccess() &&
      emailResult.isSuccess()
    ) {
      return Result.success(
        new Student({
          firstName: firstNameResult.getValue(),
          lastName: lastNameResult.getValue(),
          email: emailResult.getValue(),
        })
      );
    }

    if (firstNameResult.isFailure()) {
      errors.firstName = firstNameResult.getError();
    }
    if (lastNameResult.isFailure()) {
      errors.lastName = lastNameResult.getError();
    }
    if (emailResult.isFailure()) {
      errors.email = emailResult.getError();
    }

    return Result.failure(errors);
  }

  public updateFirstName(
    firstName: string
  ): Result<Student, StudentValidationError> {
    const oldFirstName = this.state.firstName.value;
    const result = Student.create({
      firstName,
      lastName: this.state.lastName.value,
    });

    if (result.isSuccess()) {
      const student = result.getValue();
      student.events.push(
        new FirstNameUpdated(student, oldFirstName, firstName)
      );
    }

    return result;
  }

  public updateLastName(
    lastName: string
  ): Result<Student, StudentValidationError> {
    const oldLastName = this.state.lastName.value;
    const result = Student.create({
      firstName: this.state.firstName.value,
      lastName,
    });

    if (result.isSuccess()) {
      const student = result.getValue();
      student.events.push(new LastNameUpdated(student, oldLastName, lastName));
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