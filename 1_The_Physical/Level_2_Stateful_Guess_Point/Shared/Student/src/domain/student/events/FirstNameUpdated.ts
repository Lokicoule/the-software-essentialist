import { Student } from "../entity/Student";
import { DomainEvent } from "../../core/DomainEvent";

export class FirstNameUpdated implements DomainEvent {
  public readonly name = "FirstNameUpdated";
  public readonly timestamp: Date;

  constructor(
    public readonly student: Student,
    public readonly oldFirstName: string,
    public readonly newFirstName: string
  ) {
    this.timestamp = new Date();
  }
}
