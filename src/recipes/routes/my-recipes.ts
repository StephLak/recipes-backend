import express, { Request, Response } from 'express';
import { Recipe } from '../models/recipe';
import { currentUser } from '../../shared/middlewares/current-user';

const router = express.Router();

router.get('/api/my-recipes', currentUser, async (req: Request, res: Response) => {
  const recipes = await Recipe.find({
    userId: req.currentUser!.id
  });

  res.send(recipes);
});

export { router as myRecipesRouter };