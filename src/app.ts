import express, { NextFunction, Request, Response } from 'express';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { signupRouter } from './user/routes/signup';
import { NotFoundError } from './shared/errors';
import { errorHandler } from './shared/middlewares/error-handler';
import { signinRouter } from './user/routes/signin';
import { createRecipeRouter } from './recipes/routes/create';
import { signoutRouter } from './user/routes/signout';
import { deleteRecipeRouter } from './recipes/routes/delete';
import { indexRecipeRouter } from './recipes/routes';
import { myRecipesRouter } from './recipes/routes/my-recipes';
import { currentUserRouter } from './user/routes/current-user';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: false,
        // secure: process.env.NODE_ENV !== 'test',
    })
);

// Auth routes
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

// Recipe routes
app.use(deleteRecipeRouter);
app.use(createRecipeRouter);
app.use(indexRecipeRouter);
app.use(myRecipesRouter);

// Not found routes
app.all('*', async (req: Request, res: Response, next: NextFunction) => {
    try {
        throw new NotFoundError();
    } catch (error) {
        next(error);
    }
});

app.use(errorHandler);

export default app;