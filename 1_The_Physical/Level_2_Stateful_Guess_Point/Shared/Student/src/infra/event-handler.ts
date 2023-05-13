import { DomainEvent } from "../domain/core/domain-event";

export abstract class EventHandler<T extends DomainEvent> {
  public abstract handle(event: T): void;
}
