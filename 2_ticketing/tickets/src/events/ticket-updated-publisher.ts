import { Publisher, TicketUpdatedEvent, Topics } from "@ak-tickets/common"

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  topic: Topics.TicketUpdated = Topics.TicketUpdated
}
