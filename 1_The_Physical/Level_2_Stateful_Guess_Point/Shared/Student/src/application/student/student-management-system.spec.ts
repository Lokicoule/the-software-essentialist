import { EventBus } from "../../infra/event-bus";
import { StudentManagementSystem } from "./student-management-system";

describe("StudentManagementSystem", () => {
  let eventBus: EventBus;
  let handler: jest.Mock;

  beforeEach(() => {
    eventBus = new EventBus();
    handler = jest.fn();
  });

  afterEach(() => {
    eventBus.clear();
    handler.mockClear();
  });

  it("should create a student", () => {
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

  it("should update a student's last name", () => {
    eventBus.subscribe("LastNameUpdated", {
      handle: handler,
    });

    const studentStudentManagementSystem: StudentManagementSystem =
      new StudentManagementSystem(eventBus);
    const student = studentStudentManagementSystem.createStudent("John", "Doe");
    const updatedStudent = studentStudentManagementSystem.updateStudentLastName(
      student!,
      "Doe"
    );

    expect(updatedStudent?.lastName).toBe("Doe");
    expect(handler).toHaveBeenCalledTimes(1);
  });
});
