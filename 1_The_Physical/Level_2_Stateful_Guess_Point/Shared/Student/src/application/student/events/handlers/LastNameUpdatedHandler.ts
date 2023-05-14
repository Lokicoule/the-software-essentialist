import { LastNameUpdated } from "../../../../domain/student/events/LastNameUpdated";
import { EventHandler } from "../../../../infra/EventHandler";

export class LastNameUpdatedEventHandler extends EventHandler<LastNameUpdated> {
  public handle(event: LastNameUpdated) {
    console.log("Last name updated", event);
  }
}
