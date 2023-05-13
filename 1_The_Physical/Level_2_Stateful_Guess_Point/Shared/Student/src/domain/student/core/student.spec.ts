import { EventBus } from "../../../infra/event-bus";
import { Student } from "./student";

describe("Student", () => {
  describe("create", () => {
    it("should create a student", () => {
      // Arrange
      const firstName = "Joe";
      const lastName = "Doe";

      // Act
      const student = Student.create({ firstName, lastName });

      // Assert
      expect(student).toBeDefined();
      expect(student?.getValue().firstName).toBe(firstName);
      expect(student?.getValue().lastName).toBe(lastName);
      expect(student?.getValue().email).toBe("doejo@essentialist.dev");
    });

    it("should emit StudentCreated event", () => {
      // Arrange
      const firstName = "Joe";
      const lastName = "Doe";
      const studentCreatedHandler = jest.fn();
      EventBus.getInstance().subscribe("StudentCreated", studentCreatedHandler);

      // Act
      Student.create({ firstName, lastName }, EventBus.getInstance());

      // Assert
      expect(studentCreatedHandler).toHaveBeenCalledTimes(1);
    });

    it("should fail if first name is invalid", () => {
      // Arrange
      const firstName = "J";
      const lastName = "Doe";

      // Act
      const student = Student.create({ firstName, lastName });

      // Assert
      expect(student.getError()).toEqual(
        expect.objectContaining({
          firstName: {
            min: "Firstname must be at least 2 characters long",
          },
        })
      );
    });

    it("should fail if last name is invalid", () => {
      // Arrange
      const firstName = "Joe";
      const lastName = "D";

      // Act
      const student = Student.create({ firstName, lastName });

      // Assert
      expect(student.getError()).toEqual(
        expect.objectContaining({
          lastName: {
            min: "Lastname must be at least 2 characters long",
          },
        })
      );
    });

    it("should fail if first name and last name are invalid", () => {
      // Arrange
      const firstName = "J";
      const lastName = "D";

      // Act
      const student = Student.create({ firstName, lastName });

      // Assert
      expect(student.getError()).toEqual(
        expect.objectContaining({
          firstName: {
            min: "Firstname must be at least 2 characters long",
          },
          lastName: {
            min: "Lastname must be at least 2 characters long",
          },
        })
      );
    });
  });

  describe("updateFirstName", () => {
    it("should update first name", () => {
      // Arrange
      const firstName = "Joe";
      const lastName = "Doe";
      const newFirstName = "Asterix";

      // Act
      const student = Student.create({ firstName, lastName });
      const updatedStudent = student
        .getValue()
        .updateFirstName(newFirstName, EventBus.getInstance());

      // Assert
      expect(updatedStudent.getValue().firstName).toBe(newFirstName);
      expect(updatedStudent.getValue().lastName).toBe(lastName);
      expect(updatedStudent.getValue().email).toBe("doeas@essentialist.dev");
    });

    it("should emit FirstNameUpdated event", () => {
      // Arrange
      const firstName = "Joe";
      const lastName = "Doe";
      const newFirstName = "Asterix";
      const firstNameUpdatedHandler = jest.fn();
      const studentCreatedHandler = jest.fn();

      EventBus.getInstance().subscribe(
        "FirstNameUpdated",
        firstNameUpdatedHandler
      );
      EventBus.getInstance().subscribe("StudentCreated", studentCreatedHandler);

      // Act
      const student = Student.create({ firstName, lastName });
      student.getValue().updateFirstName(newFirstName, EventBus.getInstance());

      // Assert
      expect(firstNameUpdatedHandler).toHaveBeenCalledTimes(1);
      expect(studentCreatedHandler).toHaveBeenCalledTimes(0);
    });

    it("should fail if first name is invalid", () => {
      // Arrange
      const firstName = "Joe";
      const lastName = "Doe";
      const newFirstName = "J";

      // Act
      const student = Student.create({ firstName, lastName });
      const updatedStudent = student
        .getValue()
        .updateFirstName(newFirstName, EventBus.getInstance());

      // Assert
      expect(updatedStudent.getError()).toEqual(
        expect.objectContaining({
          firstName: {
            min: "Firstname must be at least 2 characters long",
          },
        })
      );
    });
  });

  describe("updateLastName", () => {
    it("should update last name", () => {
      // Arrange
      const firstName = "Joe";
      const lastName = "Doe";
      const newLastName = "Dalton";

      // Act
      const student = Student.create({ firstName, lastName });
      const updatedStudent = student
        .getValue()
        .updateLastName(newLastName, EventBus.getInstance());

      // Assert
      expect(updatedStudent).toBeDefined();
      expect(updatedStudent?.getValue().firstName).toBe(firstName);
      expect(updatedStudent?.getValue().lastName).toBe(newLastName);
      expect(updatedStudent?.getValue().email).toBe("daltojo@essentialist.dev");
    });

    it("should emit LastNameUpdated event", () => {
      // Arrange
      const firstName = "Joe";
      const lastName = "Doe";
      const newLastName = "Dalton";
      const lastNameUpdatedHandler = jest.fn();
      const studentCreatedHandler = jest.fn();

      EventBus.getInstance().subscribe(
        "LastNameUpdated",
        lastNameUpdatedHandler
      );
      EventBus.getInstance().subscribe("StudentCreated", studentCreatedHandler);

      // Act
      const student = Student.create({ firstName, lastName });
      student.getValue().updateLastName(newLastName, EventBus.getInstance());

      // Assert
      expect(lastNameUpdatedHandler).toHaveBeenCalledTimes(1);
      expect(studentCreatedHandler).toHaveBeenCalledTimes(0);
    });

    it("should fail if last name is invalid", () => {
      // Arrange
      const firstName = "Joe";
      const lastName = "Doe";
      const newLastName = "D";

      // Act
      const student = Student.create({ firstName, lastName });
      const updatedStudent = student
        .getValue()
        .updateLastName(newLastName, EventBus.getInstance());

      // Assert
      expect(updatedStudent.getError()).toEqual(
        expect.objectContaining({
          lastName: {
            min: "Lastname must be at least 2 characters long",
          },
        })
      );
    });
  });
});
