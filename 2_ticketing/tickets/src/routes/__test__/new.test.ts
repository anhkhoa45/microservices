import request from 'supertest'
import { app } from '../../app'
import { Ticket } from '../../models/ticket'

it('has a route handler for POST /api/tickets', async () => {
    const respone = await request(app)
        .post('/api/tickets')
        .send({})

    expect(respone.status).not.toEqual(404)
})

it('can not be accesed if the user is not signed in', async () => {
    await request(app)
    .post('/api/tickets')
    .send({})
    .expect(401)
})

it('can be accesed if the user is signed in', async () => {
    const cookie = global.signin()
    const respone = await request(app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({})

    expect(respone.status).not.toEqual(401)
})

it('returns an error if invalid title is provided', async () => {
    const cookie = global.signin()
    await request(app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({
            title: '',
            price: 40
        })
        .expect(400)

    await request(app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({
            price: 40
        })
        .expect(400)
})

it('returns an error if invalid price is provided', async () => {
    const cookie = global.signin()
    await request(app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({
            title: 'ticket title',
            price: -1
        })
        .expect(400)

    await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
        title: 'ticket title'
    })
    .expect(400)
})

it('create ticket with valid inputs', async () => {
    let tickets = await Ticket.find({})
    expect(tickets.length).toEqual(0)

    const cookie = global.signin()
    const title = 'ticket title'
    const price = 20

    await request(app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({
            title,
            price
        })
        .expect(201)

    tickets = await Ticket.find({})
    expect(tickets.length).toEqual(1)
    expect(tickets[0].title).toEqual(title)
    expect(tickets[0].price).toEqual(price)
})
