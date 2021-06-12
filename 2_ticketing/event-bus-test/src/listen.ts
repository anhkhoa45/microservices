import { Kafka } from 'kafkajs'
 
const kafka = new Kafka({
  clientId: `consumer-${Math.floor(Math.random() * 100)}`,
  brokers: ['kafka.kafka.svc.cluster.local:9092']
})

const consumer = kafka.consumer({ groupId: `consumer-group` })
 
const run = async () => {
  // Consuming
  await consumer.connect()
  await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })
 
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value?.toString(),
      })
    },
  })
}

run().catch(console.error)

