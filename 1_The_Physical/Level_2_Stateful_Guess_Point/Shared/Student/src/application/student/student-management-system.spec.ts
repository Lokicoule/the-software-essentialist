import { Student } from "../../domain/student/core/student";
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

  describe("createStudent", () => {
    it("should create a student", () => {
      eventBus.subscribe("StudentCreated", {
        handle: handler,
      });

      const studentStudentManagementSystem: StudentManagementSystem =
        new StudentManagementSystem(eventBus);
      const student = studentStudentManagementSystem.createStudent(
        "John",
        "Doe"
      );

      expect(student).not.toBeNull();
      expect(student?.firstName).toBe("John");
      expect(student?.lastName).toBe("Doe");
      expect(student?.email).toBe("doejo@essentialist.dev");
      expect(handler).toHaveBeenCalledTimes(1);
    });

    it.each([
      ["first", "J", "Doe"],
      ["last", "John", "D"],
    ])(
      "should fail if %s name is invalid",
      (_name: string, firstName: string, lastName: string) => {
        eventBus.subscribe("StudentCreated", {
          handle: handler,
        });

        const studentStudentManagementSystem: StudentManagementSystem =
          new StudentManagementSystem(eventBus);
        const student = studentStudentManagementSystem.createStudent(
          firstName,
          lastName
        );

        expect(student).toBeNull();
        expect(handler).not.toHaveBeenCalled();
      }
    );
  });

  describe("updateStudentFirstName", () => {
    it("should update a student's first name", () => {
      eventBus.subscribe("FirstNameUpdated", {
        handle: handler,
      });

      const studentStudentManagementSystem: StudentManagementSystem =
        new StudentManagementSystem(eventBus);
      const student = studentStudentManagementSystem.createStudent(
        "John",
        "Doe"
      );
      const updatedStudent =
        studentStudentManagementSystem.updateStudentFirstName(student!, "Jane");

      expect(updatedStudent?.firstName).toBe("Jane");
      expect(handler).toHaveBeenCalledTimes(1);
    });

    it("should fail if first name is invalid", () => {
      eventBus.subscribe("FirstNameUpdated", {
        handle: handler,
      });

      const studentStudentManagementSystem: StudentManagementSystem =
        new StudentManagementSystem(eventBus);
      const student = studentStudentManagementSystem.createStudent(
        "John",
        "Doe"
      );
      const updatedStudent =
        studentStudentManagementSystem.updateStudentFirstName(student!, "J");

      expect(updatedStudent).toBeNull();
      expect(handler).not.toHaveBeenCalled();
    });

    it("should throw an Error if student does not exist", () => {
      eventBus.subscribe("FirstNameUpdated", {
        handle: handler,
      });

      const studentStudentManagementSystem: StudentManagementSystem =
        new StudentManagementSystem(eventBus);

      expect(() =>
        studentStudentManagementSystem.updateStudentFirstName(
          null as unknown as Student,
          "Jane"
        )
      ).toThrowError("InternalServerError: Student does not exist");

      expect(handler).not.toHaveBeenCalled();
    });
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
