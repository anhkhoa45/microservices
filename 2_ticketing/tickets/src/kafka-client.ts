import { Kafka, Producer, ProducerConfig } from 'kafkajs'

class KafkaClientWraper {
  private _client?: Kafka

  get client() {
    if (!this._client)
      throw new Error('Cannot access before init')
    return this._client
  }

  init(clientId: string, brokers: string[]) {
    if (!this._client)
      this._client = new Kafka({
        clientId,
        brokers
      })
  }
}

class KafkaProducerWraper {
  private _producer?: Producer

  get producer() {
    if (!this._producer)
      throw new Error('Cannot access before init')
    return this._producer
  }

  async init(client: Kafka, config: ProducerConfig) {
    if (!this._producer) {
      this._producer = client.producer(config)
      await this._producer.connect()
      console.log('Kafka connected')
    }
  }
}

export const kafka = new KafkaClientWraper()
export const kafkaProducer = new KafkaProducerWraper()
