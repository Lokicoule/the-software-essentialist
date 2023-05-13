import { DomainEvent } from "../domain/core/domain-event";
import { EventBus } from "./event-bus";

describe("EventBus", () => {
  class TestEvent implements DomainEvent {
    public readonly name = "TestEvent";
    public readonly timestamp: Date;

    constructor(public readonly test: string) {
      this.timestamp = new Date();
    }
  }

  it("should publish events to subscribers", () => {
    const handler = jest.fn();
    EventBus.getInstance().subscribe("TestEvent", handler);
    EventBus.getInstance().publish(new TestEvent("test"));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("should not publish events to unsubscribed handlers", () => {
    const handler = jest.fn();
    EventBus.getInstance().publish(new TestEvent("test"));
    expect(handler).toHaveBeenCalledTimes(0);
  });

  it("should publish events to multiple subscribers", () => {
    const handler1 = jest.fn();
    const handler2 = jest.fn();
    EventBus.getInstance().subscribe("TestEvent", handler1);
    EventBus.getInstance().subscribe("TestEvent", handler2);
    EventBus.getInstance().publish(new TestEvent("test"));
    expect(handler1).toHaveBeenCalledTimes(1);
    expect(handler2).toHaveBeenCalledTimes(1);
  });
});
