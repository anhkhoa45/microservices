import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import jwt from 'jsonwebtoken'

import { validateRequest, BadRequestError } from '@ak-tickets/common'
import { User } from '../models/user'
import { Password } from '../services/password'

const router = express.Router();

router.post('/api/users/signin', [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('You must supply a password')
],
validateRequest,
async (req: Request, res: Response) => {
    const { email, password } = req.body

    // Login
    const user = await User.findOne({ email }).exec()
    if (!user || !(await Password.compare(user.password, password))) {
        throw new BadRequestError('Invalid credentials!')
    }

    // JWT
    const userJwt = jwt.sign({
        id: user.id,
        email: user.email
    }, process.env.JWT_KEY!)
    req.session = {
        jwt: userJwt
    }

    res.status(200).send(user)
})

export { router as signinRouter }
