import { FirstNameUpdatedEventHandler } from "../application/student/events/handlers/FirstNameUpdatedHandler";
import { LastNameUpdatedEventHandler } from "../application/student/events/handlers/LastNameUpdatedHandler";
import { StudentCreatedEventHandler } from "../application/student/events/handlers/StudentCreatedHandler";
import { FirstNameUpdated } from "../domain/student/events/FirstNameUpdated";
import { LastNameUpdated } from "../domain/student/events/LastNameUpdated";
import { StudentCreated } from "../domain/student/events/StudentCreated";
import { EventBus } from "./EventBus";

const eventBus = new EventBus();

eventBus.subscribe(FirstNameUpdated.name, new FirstNameUpdatedEventHandler());
eventBus.subscribe(LastNameUpdated.name, new LastNameUpdatedEventHandler());
eventBus.subscribe(StudentCreated.name, new StudentCreatedEventHandler());

export { eventBus };
