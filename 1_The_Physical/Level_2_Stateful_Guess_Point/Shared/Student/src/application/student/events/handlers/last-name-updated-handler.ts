import { DomainEvent } from "../../../../domain/core/domain-event";

export class LastNameUpdatedEventHandler {
  public handle(event: DomainEvent) {
    console.log("Last name updated", event);
  }
}
