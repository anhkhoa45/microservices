import { Publisher } from "./base-publisher";
import { TicketCreatedEvent } from "./ticket-created-event";
import { Topics } from "./topics";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  topic: Topics.TicketCreated = Topics.TicketCreated
}