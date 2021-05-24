import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import jwt from 'jsonwebtoken'

import { validateRequest } from '../middlewares/request-validation'
import { BadRequestError } from '../errors/bad-request-error'
import { User } from '../models/user'

const router = express.Router();

router.post('/api/users/signup', [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage('Password must be between 4 and 20 characters')
],
validateRequest,
async (req: Request, res: Response) => {
    const { email, password } = req.body

    // Check if user already existed
    const existingUser = await User.findOne({ email }).exec()
    if (existingUser) {
        throw new BadRequestError('Email in use!')
    }

    // Create user record
    const user = User.build({ email, password })

    // JWT
    const userJwt = jwt.sign({
        id: user.id,
        email: user.email
    }, process.env.JWT_KEY!)
    req.session = {
        jwt: userJwt
    }

    // Persist user record
    await user.save()

    res.status(201).send(user)
})

export { router as signupRouter }
