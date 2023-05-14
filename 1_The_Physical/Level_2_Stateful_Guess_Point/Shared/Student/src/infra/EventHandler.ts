import { DomainEvent } from "../domain/core/DomainEvent";

export abstract class EventHandler<T extends DomainEvent> {
  public abstract handle(event: T): void;
}
