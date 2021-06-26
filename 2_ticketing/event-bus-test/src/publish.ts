import { TicketCreatedPublisher } from "./events/ticket-created-publisher"

const ticketCreatedPublisher = new TicketCreatedPublisher()

const run = async () => {
  await ticketCreatedPublisher.publish([
    {
      id: 'abc',
      title: 'aasdewr',
      price: 20
    }
  ])
  console.log('Message published')
}

setInterval(() => {
  run().catch(console.error)
}, 2000)
