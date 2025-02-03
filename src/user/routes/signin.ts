import jwt from 'jsonwebtoken';
import express, { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import { User } from '../models/user';
import { Password } from '../services/password';
import { BadRequestError } from '../../shared/errors';
import { validateRequest } from '../../shared/middlewares';

const router = express.Router();

router.post('/api/users/signin', 
    [
        body('email') 
            .isEmail()
            .withMessage("L'e-mail deve essere valida"),
        body('password')
            .trim()
            .notEmpty()
            .withMessage('È necessario fornire una password')
    ],
    validateRequest,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body;

            const existingUser = await User.findOne({ email });
            if (!existingUser) {
                throw new BadRequestError('Invalid credentials');
            }

            const passwordsMatch = await Password.compare(existingUser.password, password);
            if (!passwordsMatch) {
                throw new BadRequestError('Invalid credentials');
            }
            const userJwt = jwt.sign(
                {
                    id: existingUser.id,
                    email: existingUser.email
                }, 
                process.env.JWT_KEY!
            );

            req.session =  {
                jwt: userJwt
            };

            res.status(200).send(existingUser);
        } catch (error) {
            next(error);
        }
    }
)

export { router as signinRouter };