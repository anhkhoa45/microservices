import request from 'supertest'
import mongoose from 'mongoose'

import { app } from '../../app'

const createTicket = async (cookie: string[], ticket: object) => {
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send(ticket)
        .expect(201)

    return response.body.id
}

it('returns 404 if the provided id does not existed', async () => {
    const title = 'ticket title'
    const price = 20

    await request(app)
        .put(`/api/tickets/${ new mongoose.Types.ObjectId().toHexString() }`)
        .set('Cookie', global.signin())
        .send({
            title,
            price
        })
        .expect(404)
})

it('returns 401 if not signed in', async () => {
    const title = 'ticket title'
    const price = 20
    const ticketId = await createTicket(global.signin(), { title, price })

    await request(app)
        .put(`/api/tickets/${ ticketId }`)
        .send({
            title: 'new title',
            price: 20
        })
        .expect(401)
})

it('returns 401 if not ticket owner', async () => {
    const title = 'ticket title'
    const price = 20
    const ticketId = await createTicket(global.signin(), { title, price })

    await request(app)
        .put(`/api/tickets/${ ticketId }`)
        .set('Cookie', global.signin())
        .send({
            title: 'new title',
            price: 20
        })
        .expect(401)
})

it('returns 400 if invalid title or price is provided', async () => {
    const title = 'ticket title'
    const price = 20
    const cookie = global.signin()
    const ticketId = await createTicket(cookie, { title, price })

    await request(app)
        .put(`/api/tickets/${ ticketId }`)
        .set('Cookie', cookie)
        .send({
            title: '',
            price: -20
        })
        .expect(400)

    await request(app)
        .put(`/api/tickets/${ ticketId }`)
        .set('Cookie', cookie)
        .send({
            title: '',
            price: 20
        })
        .expect(400)

    await request(app)
        .put(`/api/tickets/${ ticketId }`)
        .set('Cookie', cookie)
        .send({
            title: 'new title',
            price: -20
        })
        .expect(400)
})

it('returns 201 if update successfully', async () => {
    const title = 'ticket title'
    const price = 20
    const cookie = global.signin()
    const ticketId = await createTicket(cookie, { title, price })

    const newTitle = 'new title'
    const newPrice = 10
    const response = await request(app)
        .put(`/api/tickets/${ ticketId }`)
        .set('Cookie', cookie)
        .send({
            title: newTitle,
            price: newPrice
        })
        .expect(201)

    expect(response.body.title).toEqual(newTitle)
    expect(response.body.price).toEqual(newPrice)
})

