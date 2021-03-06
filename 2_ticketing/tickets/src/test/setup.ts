import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken';

declare global {
    namespace NodeJS {
        interface Global {
            signin(): string[]
        }
    }
}

jest.mock('../kafka-client')

let mongo: any

beforeAll(async () => {
    process.env.JWT_KEY = 'jwt_key'
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

    mongo = new MongoMemoryServer()
    const mongoUri = await mongo.getUri()

    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
})

beforeEach(async () => {
    jest.clearAllMocks()
    const collections = await mongoose.connection.db.collections()
    for (let collection of collections) {
        await collection.deleteMany({})
    }
})

afterAll(async () => {
    await mongo.stop()
    await mongoose.connection.close()
})

global.signin = () => {
    const mockId = new mongoose.Types.ObjectId().toHexString()
    const payload = {
        id: mockId,
        email: 'mockId@test.com'
    }
    const token = jwt.sign(payload, process.env.JWT_KEY!)
    const cookie = Buffer.from(JSON.stringify({ jwt: token })).toString('base64')

    return [`express:sess=${cookie}`]
}
