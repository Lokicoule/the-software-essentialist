import { DomainEvent } from "../domain/core/domain-event";

type EventHandler = (event: DomainEvent) => void;

export class EventBus {
  private static instance: EventBus;

  private subscribers: Map<string, EventHandler[]> = new Map();

  private constructor() {}

  public static getInstance(): EventBus {
    if (!EventBus.instance) {
      EventBus.instance = new EventBus();
    }

    return EventBus.instance;
  }

  public publish(event: DomainEvent): void {
    const handlers = this.subscribers.get(event.name) || [];
    handlers.map((handler) => handler(event));
  }

  public subscribe(eventName: string, handler: EventHandler): void {
    if (!this.subscribers.has(eventName)) {
      this.subscribers.set(eventName, []);
    }

    this.subscribers.get(eventName)?.push(handler);
  }
}
