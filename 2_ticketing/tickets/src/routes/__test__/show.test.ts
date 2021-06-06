import request from 'supertest'
import mongoose from 'mongoose'

import { app } from '../../app'

it('returns 404 if ticket is not found', async () => {
    await request(app)
        .get(`/api/tickets/${ new mongoose.Types.ObjectId().toHexString() }`)
        .expect(404)
})

it('returns 200 if ticket is found', async () => {
    const title = 'ticket title'
    const price = 20

    const respone = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title,
            price
        })
        .expect(201)

    const getResponse = await request(app)
        .get(`/api/tickets/${respone.body.id}`)
        .send()
        .expect(200)

    expect(getResponse.body.title).toEqual(title)
    expect(getResponse.body.price).toEqual(price)
})
