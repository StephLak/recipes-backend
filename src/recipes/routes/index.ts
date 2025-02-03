import express, { Request, Response } from 'express';
import { Recipe } from '../models/recipe';
import { currentUser } from '../../shared/middlewares/current-user';

const router = express.Router();

router.get('/api/recipes', currentUser, async (req: Request, res: Response) => {
  const recipes = await Recipe.find({});

  res.status(200).send(recipes);
});

export { router as indexRecipeRouter };