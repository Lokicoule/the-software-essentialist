import { Student } from "../../domain/student/core/student";
import { EventBus } from "../../infra/event-bus";

export class StudentManagementSystem {
  constructor(private readonly eventBus: EventBus) {}

  public createStudent(firstName: string, lastName: string): Student | null {
    const student = Student.create({ firstName, lastName }, this.eventBus);

    if (student.isSuccess()) {
      return student.getValue();
    } else {
      console.error("Student not created", student.getError());
      return null;
    }
  }

  public updateStudentFirstName(
    student: Student,
    firstName: string
  ): Student | null {
    const result = student?.updateFirstName(firstName, this.eventBus);

    if (result?.isSuccess()) {
      console.log("First name updated", result.getValue());
      return result.getValue();
    } else if (result?.isFailure()) {
      console.log("First name not updated", result.getError());
      return null;
    }

    throw new Error("InternalServerError: Student does not exist");
  }

  public updateStudentLastName(
    student: Student,
    lastName: string
  ): Student | null {
    const result = student.updateLastName(lastName, this.eventBus);

    if (result.isSuccess()) {
      console.log("Last name updated", result.getValue());
      return result.getValue();
    } else {
      console.log("Last name not updated", result.getError());
      return null;
    }
  }
}
