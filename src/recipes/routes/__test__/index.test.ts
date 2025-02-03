import mongoose from "mongoose";
import { Recipe } from "../../models/recipe";
import request from 'supertest';
import app from "../../../app";

const buildRecipe = async () => {
    const recipe = Recipe.build({
        userId: new mongoose.Types.ObjectId().toHexString(),
        title: 'Cook beans', 
        description: 'Wash the beans and boil it for 10mins'
    });

    await recipe.save();

    return recipe;
}

it('gets all the recipes successfully', async () => {
    const user = await global.signin();
    buildRecipe();
    buildRecipe();

    // Make a request to get recipes
    const { body: recipes } = await request(app)
        .get('/api/recipes')
        .set('Cookie', user)
        .send()
        .expect(200);

    expect(recipes.length).toEqual(2);
});
