import { Kafka, Producer, Message } from 'kafkajs'
import { Topics } from './topics'

interface Event {
  topic: Topics
  data: any
}

export abstract class Publisher<T extends Event> {
  abstract topic: T['topic']
  private producer: Producer

  constructor() {
    const kafka = new Kafka({
      clientId: 'transactional-client',
      brokers: ['kafka.kafka.svc.cluster.local:9092']
    })
    this.producer = kafka.producer({
      maxInFlightRequests: 1,
      idempotent: true,
      transactionalId: this.constructor.name
    })
    this.producer.connect()
  }

  /**
   * Publishs publisher
   * @param data 
   * @param [func] actions to be executed before commiting event
   */
  async publish(data: T['data'][], func?: Function) {
    const transaction = await this.producer.transaction()

    try {
      await transaction.send({
        topic: this.topic,
        messages: data.map(message => <Message>{ value: Buffer.from(JSON.stringify(message)) })
      })

      if (func)  await func()

      await transaction.commit()
    } catch (e) {
      await transaction.abort()
    }
  }
}