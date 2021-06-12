import { Kafka } from 'kafkajs'
 
const kafka = new Kafka({
  clientId: 'producer',
  brokers: ['kafka.kafka.svc.cluster.local:9092']
})

const producer = kafka.producer()
 
const run = async () => {
  // Producing
  console.log('Connecting to kafka ...')
  await producer.connect()
  console.log("Publishing message ...")
  await producer.send({
    topic: 'test-topic',
    messages: [
      { value: 'Hello KafkaJS user!' },
    ],
  })

  console.log("Message published")
}

setInterval(() => {
  run().catch(console.error)
}, 2000)
