import { LastNameUpdated } from "../../../../domain/student/events/last-name-updated";
import { EventHandler } from "../../../../infra/event-handler";

export class LastNameUpdatedEventHandler extends EventHandler<LastNameUpdated> {
  public handle(event: LastNameUpdated) {
    console.log("Last name updated", event);
  }
}
