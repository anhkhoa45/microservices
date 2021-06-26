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

  constructor(groupId: string) {
    const kafka = new Kafka({
      brokers: ['kafka.kafka.svc.cluster.local:9092']
    })
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

    this.handleDisconnect()
  }

  handleDisconnect() {
    const errorTypes = ['unhandledRejection', 'uncaughtException']
    const signalTraps = ['SIGTERM', 'SIGINT', 'SIGUSR2']

    errorTypes.forEach(type => {
      process.on(type, async e => {
        try {
          console.log(`process.on ${type}: Closing consumer ${this.topic} - ${this.consumerGroupName}`)
          console.error(e)
          await this.consumer.disconnect()
        } catch (err) {
          console.error(err)
        }
      })
    })

    signalTraps.forEach(type => {
      process.on(type, async () => {
        try {
          console.log(`process.on ${type}: Closing consumer ${this.topic} - ${this.consumerGroupName}`)
          await this.consumer.disconnect()
        } catch (err) {
          console.error(err)
        }
      })
    })
  }
}