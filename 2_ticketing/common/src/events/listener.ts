import { Kafka, Consumer } from 'kafkajs'
import { Topics } from './topics'

interface Event {
  topic: Topics
  data: any
}

export abstract class Listener<T extends Event> {
  abstract topic: T['topic']
  abstract consumerGroupName: string
  abstract onMessage(data: T['data']): void
  private consumer: Consumer

  constructor(kafka: Kafka, groupId: string) {
    this.consumer = kafka.consumer({ groupId })
  }

  async listen() {
    await this.consumer.connect()
    await this.consumer.subscribe({ topic: this.topic })

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          topic,
          partition,
          offset: message.offset,
          value: message.value?.toString(),
        })
        this.onMessage(JSON.parse(message.value?.toString() || ''))
      }
    })
  }
}