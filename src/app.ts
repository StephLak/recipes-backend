import express, { NextFunction, Request, Response } from 'express';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { signupRouter } from './user/routes/signup';
import { NotFoundError } from './shared/errors';
import { errorHandler } from './shared/middlewares/error-handler';
import { signinRouter } from './user/routes/signin';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== 'test',
    })
);

app.use(signinRouter);
app.use(signupRouter);

app.all('*', async (req: Request, res: Response, next: NextFunction) => {
    try {
        throw new NotFoundError();
    } catch (error) {
        next(error);
    }
});

app.use(errorHandler);

export default app;