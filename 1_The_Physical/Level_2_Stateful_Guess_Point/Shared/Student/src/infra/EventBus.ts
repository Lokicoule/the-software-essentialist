import { DomainEvent } from "../domain/core/DomainEvent";
import { EventHandler } from "./EventHandler";

export class EventBus {
  private subscribers: Map<string, EventHandler<DomainEvent>> = new Map();

  public publish(event: DomainEvent): void {
    const eventName = event.name;
    const handler = this.subscribers.get(eventName);

    if (handler) {
      handler.handle(event);
    }
  }

  public subscribe(
    eventName: string,
    handler: EventHandler<DomainEvent>
  ): void {
    if (!this.subscribers.has(eventName)) {
      this.subscribers.set(eventName, handler);
    }
  }

  public clear(): void {
    this.subscribers.clear();
  }
}
