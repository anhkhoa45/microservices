import { Publisher, TicketCreatedEvent, Topics } from "@ak-tickets/common"

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  topic: Topics.TicketCreated = Topics.TicketCreated
}
