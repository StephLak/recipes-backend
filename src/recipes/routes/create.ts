import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../../shared/middlewares';
import { Recipe } from '../models/recipe';
import { currentUser } from '../../shared/middlewares/current-user';

const router = express.Router();

router.post(
  '/api/recipes',
  currentUser,
  [
    body('title').not().isEmpty().withMessage('Il titolo è obbligatorio'),
    body('description').not().isEmpty().withMessage('La descrizione è obbligatoria'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, description } = req.body;

    const recipe = Recipe.build({
      title,
      description,
      userId: req.currentUser!.id,
    });
    await recipe.save();

    res.status(201).send(recipe);
  }
);

export { router as createRecipeRouter };
