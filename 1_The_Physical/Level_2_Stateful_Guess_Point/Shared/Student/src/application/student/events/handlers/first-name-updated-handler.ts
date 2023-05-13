import { FirstNameUpdated } from "../../../../domain/student/events/first-name-updated";
import { EventHandler } from "../../../../infra/event-handler";

export class FirstNameUpdatedEventHandler extends EventHandler<FirstNameUpdated> {
  public handle(event: FirstNameUpdated) {
    console.log("First name updated", event);
  }
}
