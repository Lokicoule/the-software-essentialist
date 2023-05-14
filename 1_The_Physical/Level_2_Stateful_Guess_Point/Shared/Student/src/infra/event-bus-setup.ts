import { FirstNameUpdatedEventHandler } from "../application/student/events/handlers/first-name-updated-handler";
import { LastNameUpdatedEventHandler } from "../application/student/events/handlers/last-name-updated-handler";
import { StudentCreatedEventHandler } from "../application/student/events/handlers/student-created-handler";
import { FirstNameUpdated } from "../domain/student/events/first-name-updated";
import { LastNameUpdated } from "../domain/student/events/last-name-updated";
import { StudentCreated } from "../domain/student/events/student-created";
import { EventBus } from "./event-bus";

EventBus.getInstance().subscribe(
  FirstNameUpdated.name,
  new FirstNameUpdatedEventHandler()
);
EventBus.getInstance().subscribe(
  LastNameUpdated.name,
  new LastNameUpdatedEventHandler()
);
EventBus.getInstance().subscribe(
  StudentCreated.name,
  new StudentCreatedEventHandler()
);
