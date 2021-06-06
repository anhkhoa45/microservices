import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import { currentUser, NotAuthorizedError, NotFoundError, requireAuth, validateRequest } from '@ak-tickets/common'
import { Ticket } from '../models/ticket'

const router = express.Router()

router.put('/api/tickets/:id',
    currentUser,
    requireAuth,
    [
        body('title')
            .not()
            .isEmpty()
            .withMessage('Title is required'),
        body('price')
            .isFloat({ gt: 0 })
            .withMessage('Price must be greater than 0')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const ticket = await Ticket.findById(req.params.id)
        if(!ticket) {
            throw new NotFoundError()
        }

        if(ticket.userId != req.currentUser?.id) {
            throw new NotAuthorizedError()
        }

        const { title, price } = req.body

        ticket.title = title
        ticket.price = price

        ticket.save()

        res.status(201).send(ticket)
})

export { router as updateTicketRouter }
