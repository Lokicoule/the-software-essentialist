import { DomainEvent } from "../domain/core/domain-event";
import { EventBus } from "./event-bus";

describe("EventBus", () => {
  let eventBus: EventBus;

  class TestEvent implements DomainEvent {
    public readonly name = "TestEvent";
    public readonly timestamp: Date;

    constructor(public readonly test: string) {
      this.timestamp = new Date();
    }
  }

  beforeEach(() => {
    eventBus = new EventBus();
  });

  afterEach(() => {
    eventBus.clear();
  });

  describe("publish", () => {
    it("should publish events to subscribers", () => {
      const handler = jest.fn();
      eventBus.subscribe("TestEvent", {
        handle: handler,
      });
      eventBus.publish(new TestEvent("test"));
      expect(handler).toHaveBeenCalledTimes(1);
    });

    it("should not publish events to unsubscribed handlers", () => {
      const handler = jest.fn();
      eventBus.publish(new TestEvent("test"));
      expect(handler).toHaveBeenCalledTimes(0);
    });
  });

  describe("subscribe", () => {
    it("should subscribe to events", () => {
      const handler = jest.fn();
      eventBus.subscribe("TestEvent", {
        handle: handler,
      });
      eventBus.publish(new TestEvent("test"));
      expect(handler).toHaveBeenCalledTimes(1);
    });

    it("should subscribe to multiple events", () => {
      const handler = jest.fn();
      eventBus.subscribe("TestEvent", {
        handle: handler,
      });
      eventBus.subscribe("TestEvent2", {
        handle: handler,
      });
      eventBus.publish(new TestEvent("test"));
      eventBus.publish(new TestEvent("test"));
      expect(handler).toHaveBeenCalledTimes(2);
    });

    it("should not subscribe to the same event more than once", () => {
      const handler = jest.fn();
      eventBus.subscribe("TestEvent", {
        handle: handler,
      });
      eventBus.subscribe("TestEvent", {
        handle: handler,
      });
      eventBus.publish(new TestEvent("test"));
      expect(handler).toHaveBeenCalledTimes(1);
    });
  });
});
