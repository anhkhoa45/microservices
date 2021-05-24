import mongoose from 'mongoose'

import { app } from './app'

const start = async () => {
    // env
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY environment variable must be defined')
    }

    // mongo db connection
    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
    } catch (err) {
        console.error(err)
    }

    app.listen(3000, () => {
        console.log(`Listening on port 3000!!!!`)
    })
}

start()