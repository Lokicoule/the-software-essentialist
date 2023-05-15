import { FirstNameUpdated } from "../../../../domain/student/events/FirstNameUpdated";
import { EventHandler } from "../../../../infra/EventHandler";

export class FirstNameUpdatedEventHandler extends EventHandler<FirstNameUpdated> {
  public handle(event: FirstNameUpdated) {
    console.log("First name updated", event);
  }
}
