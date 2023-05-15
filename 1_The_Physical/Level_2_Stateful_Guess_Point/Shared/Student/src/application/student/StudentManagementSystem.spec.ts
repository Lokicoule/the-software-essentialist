import { Student } from "../../domain/student/entity/Student";
import { EventBus } from "../../infra/EventBus";
import { StudentManagementSystem } from "./StudentManagementSystem";

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
      // Arrange
      const studentStudentManagementSystem: StudentManagementSystem =
        new StudentManagementSystem(eventBus);

      // Act
      const student = studentStudentManagementSystem.createStudent(
        "John",
        "Doe"
      );

      // Assert
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
        // Arrange
        const studentStudentManagementSystem: StudentManagementSystem =
          new StudentManagementSystem(eventBus);

        // Act
        const student = studentStudentManagementSystem.createStudent(
          firstName,
          lastName
        );

        // Assert
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
      // Arrange
      const studentStudentManagementSystem: StudentManagementSystem =
        new StudentManagementSystem(eventBus);
      const student = studentStudentManagementSystem.createStudent(
        "John",
        "Doe"
      );

      // Act
      const updatedStudent =
        studentStudentManagementSystem.updateStudentFirstName(student!, "Jane");

      // Assert
      expect(updatedStudent?.firstName).toBe("Jane");
      expect(handler).toHaveBeenCalledTimes(1);
    });

    it("should fail if first name is invalid", () => {
      // Arrange
      const studentStudentManagementSystem: StudentManagementSystem =
        new StudentManagementSystem(eventBus);
      const student = studentStudentManagementSystem.createStudent(
        "John",
        "Doe"
      );

      // Act
      const updatedStudent =
        studentStudentManagementSystem.updateStudentFirstName(student!, "J");

      // Assert
      expect(updatedStudent).toBeNull();
      expect(handler).not.toHaveBeenCalled();
    });

    it("should throw an Error if student does not exist", () => {
      // Arrange
      const studentStudentManagementSystem: StudentManagementSystem =
        new StudentManagementSystem(eventBus);

      // Act & Assert
      expect(() =>
        studentStudentManagementSystem.updateStudentFirstName(
          null as unknown as Student,
          "Jane"
        )
      ).toThrowError("InternalServerError: Student does not exist");

      // Assert
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
      // Arrange
      const studentStudentManagementSystem: StudentManagementSystem =
        new StudentManagementSystem(eventBus);
      const student = studentStudentManagementSystem.createStudent(
        "John",
        "Doe"
      );

      // Act
      const updatedStudent =
        studentStudentManagementSystem.updateStudentLastName(student!, "Doe");

      // Assert
      expect(updatedStudent?.lastName).toBe("Doe");
      expect(handler).toHaveBeenCalledTimes(1);
    });

    it("should fail if last name is invalid", () => {
      // Arrange
      const studentStudentManagementSystem: StudentManagementSystem =
        new StudentManagementSystem(eventBus);
      const student = studentStudentManagementSystem.createStudent(
        "John",
        "Doe"
      );

      // Act
      const updatedStudent =
        studentStudentManagementSystem.updateStudentLastName(student!, "D");

      // Assert
      expect(updatedStudent).toBeNull();
      expect(handler).not.toHaveBeenCalled();
    });

    it("should throw an Error if student does not exist", () => {
      // Arrange
      const studentStudentManagementSystem: StudentManagementSystem =
        new StudentManagementSystem(eventBus);

      // Act & Assert
      expect(() =>
        studentStudentManagementSystem.updateStudentLastName(
          null as unknown as Student,
          "Doe"
        )
      ).toThrowError("InternalServerError: Student does not exist");

      // Assert
      expect(handler).not.toHaveBeenCalled();
    });
  });
});
