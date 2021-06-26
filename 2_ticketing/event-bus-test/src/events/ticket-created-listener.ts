import { Listener } from "./base-listener"
import { TicketCreatedEvent } from "./ticket-created-event"
import { Topics } from "./topics"

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    topic: Topics.TicketCreated = Topics.TicketCreated
    consumerGroupName: string

    constructor(groupId: string) {
        super(groupId)
        this.consumerGroupName = groupId
    }

    onMessage (data: TicketCreatedEvent['data']) : void {
        console.log('Event data', data)
    }
}