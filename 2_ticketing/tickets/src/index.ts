import mongoose from 'mongoose'

import { app } from './app'
import { kafka, kafkaProducer } from './kafka-client'

const start = async () => {
  // env
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY environment variable must be defined')
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI environment variable must be defined')
  }

  // mongo db connection
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
  } catch (err) {
    console.error(err)
  }

  // init kafka client
  kafka.init('asdasdas', [
    'kafka.kafka.svc.cluster.local:9092'
  ])
  try {
    await kafkaProducer.init(kafka.client, {
      maxInFlightRequests: 1,
      idempotent: true,
      transactionalId: 'sadqweas'
    })
  } catch (e) {
    console.log(e)
  }

  // handle process exit
  process.on('SIGTERM', async () => {
    try {
      console.log('Exiting application ...')
      await kafkaProducer.producer.disconnect()
      console.log('Kafka producer disconnected')
      process.exit(0)
    } catch (e) {
      console.log('Error ', e)
      process.exit(1)
    }
  })

  app.listen(3000, () => {
    console.log(`Listening on port 3000!!!!`)
  })
}

start()
