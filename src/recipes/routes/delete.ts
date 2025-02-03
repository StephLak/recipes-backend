import express, { NextFunction, Request, Response } from 'express';
import { currentUser } from '../../shared/middlewares/current-user';
import { Recipe } from '../models/recipe';
import { NotFoundError } from '../../shared/errors';
import { NotAuthorizedError } from '../../shared/errors/not-authorized-error';

const router = express.Router();

router.delete('/api/recipes/:recipeId', currentUser, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const recipeId = req.params.recipeId;
  
        const recipe = await Recipe.findById(recipeId);

      
        if (!recipe) {
          throw new NotFoundError();
        }
      
        if (recipe.userId !== req.currentUser!.id) {
          throw new NotAuthorizedError();
        }
      
        await Recipe.deleteOne({ _id: recipeId, userId: req.currentUser!.id });
      
        res.status(204).send(recipe);
    } catch (error) {
        next(error);
    }
});

export { router as deleteRecipeRouter };