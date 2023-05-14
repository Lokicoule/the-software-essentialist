import { DomainEvent } from "../../core/DomainEvent";
import { Student } from "../entity/Student";

export class LastNameUpdated implements DomainEvent {
  public readonly name = "LastNameUpdated";
  public readonly timestamp: Date;

  constructor(
    public readonly student: Student,
    public readonly oldLastName: string,
    public readonly newLastName: string
  ) {
    this.timestamp = new Date();
  }
}
