import { StudentCreated } from "../../../../domain/student/events/student-created";
import { EventHandler } from "../../../../infra/event-handler";

export class StudentCreatedEventHandler extends EventHandler<StudentCreated> {
  public handle(event: StudentCreated) {
    console.log("Student created", event);
  }
}
