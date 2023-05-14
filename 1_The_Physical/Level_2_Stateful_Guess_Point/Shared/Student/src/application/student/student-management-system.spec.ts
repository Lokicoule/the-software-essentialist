import { Student } from "../../domain/student/core/student";
import { EventBus } from "../../infra/event-bus";
import { StudentManagementSystem } from "./student-management-system";

describe("StudentManagementSystem", () => {
  it("should create a student", () => {
    const handler = jest.fn();
    const eventBus = new EventBus();
    eventBus.subscribe("StudentCreated", {
      handle: handler,
    });

    const studentStudentManagementSystem: StudentManagementSystem =
      new StudentManagementSystem(eventBus);
    const student = studentStudentManagementSystem.createStudent("John", "Doe");

    expect(student).not.toBeNull();
    expect(student?.firstName).toBe("John");
    expect(student?.lastName).toBe("Doe");
    expect(student?.email).toBe("doejo@essentialist.dev");
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("should update a student's first name", () => {
    const handler = jest.fn();
    const eventBus = new EventBus();
    eventBus.subscribe("FirstNameUpdated", {
      handle: handler,
    });

    const studentStudentManagementSystem: StudentManagementSystem =
      new StudentManagementSystem(eventBus);
    const student = studentStudentManagementSystem.createStudent("John", "Doe");
    const updatedStudent =
      studentStudentManagementSystem.updateStudentFirstName(student!, "Jane");

    expect(updatedStudent?.firstName).toBe("Jane");
    expect(handler).toHaveBeenCalledTimes(1);
  });
});
