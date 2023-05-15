import { DomainEvent } from "../../core/DomainEvent";
import { Student } from "../entity/Student";

export class StudentCreated implements DomainEvent {
  public readonly name = "StudentCreated";
  public readonly timestamp: Date;

  constructor(public readonly student: Student) {
    this.timestamp = new Date();
  }
}
