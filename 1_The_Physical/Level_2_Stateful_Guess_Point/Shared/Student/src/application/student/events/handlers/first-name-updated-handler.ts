import { DomainEvent } from "../../../../domain/core/domain-event";

export class FirstNameUpdatedEventHandler {
  public handle(event: DomainEvent) {
    console.log("First name updated", event);
  }
}
