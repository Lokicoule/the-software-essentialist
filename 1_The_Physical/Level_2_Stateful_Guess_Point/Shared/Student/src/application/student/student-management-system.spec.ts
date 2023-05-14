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
    beforeEach(() => {
      eventBus.subscribe("StudentCreated", {
        handle: handler,
      });
    });

    it("should create a student", () => {
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
    beforeEach(() => {
      eventBus.subscribe("FirstNameUpdated", {
        handle: handler,
      });
    });

    it("should update a student's first name", () => {
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

  describe("updateStudentLastName", () => {
    beforeEach(() => {
      eventBus.subscribe("LastNameUpdated", {
        handle: handler,
      });
    });

    it("should update a student's last name", () => {
      const studentStudentManagementSystem: StudentManagementSystem =
        new StudentManagementSystem(eventBus);
      const student = studentStudentManagementSystem.createStudent(
        "John",
        "Doe"
      );

      const updatedStudent =
        studentStudentManagementSystem.updateStudentLastName(student!, "Doe");

      expect(updatedStudent?.lastName).toBe("Doe");
      expect(handler).toHaveBeenCalledTimes(1);
    });

    it("should fail if last name is invalid", () => {
      const studentStudentManagementSystem: StudentManagementSystem =
        new StudentManagementSystem(eventBus);
      const student = studentStudentManagementSystem.createStudent(
        "John",
        "Doe"
      );

      const updatedStudent =
        studentStudentManagementSystem.updateStudentLastName(student!, "D");

      expect(updatedStudent).toBeNull();
      expect(handler).not.toHaveBeenCalled();
    });

    it("should throw an Error if student does not exist", () => {
      const studentStudentManagementSystem: StudentManagementSystem =
        new StudentManagementSystem(eventBus);

      expect(() =>
        studentStudentManagementSystem.updateStudentLastName(
          null as unknown as Student,
          "Doe"
        )
      ).toThrowError("InternalServerError: Student does not exist");

      expect(handler).not.toHaveBeenCalled();
    });
  });
});
