import express, { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { User } from '../models/user';
import { validateRequest } from '../../shared/middlewares';
import { BadRequestError } from '../../shared/errors';

const router = express.Router();

router.post('/api/users/signup', [
    body('email')
        .isEmail()
        .withMessage("L'e-mail deve essere valida"),
    body('password')
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage('La password deve contenere da 4 a 20 caratteri')
    ], 
    validateRequest,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body;
            
            const existingUser = await User.findOne({ email });

            if (existingUser) {
                throw new BadRequestError('E-mail in uso');
            } else {
                const user = User.build({ email, password});
                await user.save();

                const userJwt = jwt.sign(
                    {
                        id: user.id,
                        email: user.email
                    }, 
                    process.env.JWT_KEY!
                );

                req.session =  {
                    jwt: userJwt
                };

                res.status(201).send(user);
            }
        } catch (error) {
            next(error);
       }
});

export { router as signupRouter };