import { DomainEvent } from "../domain/core/domain-event";
import { EventHandler } from "./event-handler";

export class EventBus {
  private static instance: EventBus;

  private subscribers: Map<string, EventHandler<DomainEvent>> = new Map();

  private constructor() {}

  public static getInstance(): EventBus {
    if (!EventBus.instance) {
      EventBus.instance = new EventBus();
    }

    return EventBus.instance;
  }

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
