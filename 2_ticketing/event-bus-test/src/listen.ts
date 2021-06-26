import { TicketCreatedListener } from "./events/ticket-created-listener"
 
const run = async () => {
  // Consuming
  const ticketCreatedListener = new TicketCreatedListener('payments-service')
  await ticketCreatedListener.listen()
}

run().catch(console.error)
