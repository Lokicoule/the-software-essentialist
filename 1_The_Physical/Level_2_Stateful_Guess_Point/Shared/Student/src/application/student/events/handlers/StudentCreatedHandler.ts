import { StudentCreated } from "../../../../domain/student/events/StudentCreated";
import { EventHandler } from "../../../../infra/EventHandler";

export class StudentCreatedEventHandler extends EventHandler<StudentCreated> {
  public handle(event: StudentCreated) {
    console.log("Student created", event);
  }
}
