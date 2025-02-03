import mongoose from "mongoose";
import { Recipe } from "../../models/recipe";
import request from 'supertest';
import app from "../../../app";

const buildRecipe = async (user: string[]) => {
    await request(app)
    .post('/api/recipes')
    .set('Cookie', user)
    .send({
      title: 'title',
      description: 'description',
    })
    .expect(201);
}

it('gets only the current user recipes successfully', async () => {
    const user = await global.signin();
    const user2 = await global.signin('another@gmail.com');
    buildRecipe(user);
    buildRecipe(user);
    buildRecipe(user);
    buildRecipe(user2);
    buildRecipe(user2);
    

    // Make a request to get recipes
    const { body: recipes } = await request(app)
        .get('/api/my-recipes')
        .set('Cookie', user)
        .send()
        .expect(200);

    expect(recipes.length).toEqual(3);
});
