import { DomainEvent } from "../../../../domain/core/domain-event";

export class StudentCreatedEventHandler {
  public handle(event: DomainEvent) {
    console.log("Student created", event);
  }
}
