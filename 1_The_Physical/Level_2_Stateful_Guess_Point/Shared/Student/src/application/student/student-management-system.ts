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
    const result = student.updateFirstName(firstName, this.eventBus);

    if (result.isSuccess()) {
      console.log("First name updated", result.getValue());
      return result.getValue();
    } else {
      console.log("First name not updated", result.getError());
      return null;
    }
  }
}
