import mongoose from "mongoose";
import { Recipe } from "../../models/recipe";
import request from 'supertest';
import app from "../../../app";

it('deletes a recipe successfully', async () => {
    const user = await global.signin();

    // Make a request to create an recipe
    const { body: recipe} = await request(app)
        .post('/api/recipes')
        .set('Cookie', user)
        .send({ 
            title: 'Cook Beans', 
            description: 'description'
         })
        .expect(201);

    // Make request to delete the recipe
    await request(app)
        .delete(`/api/recipes/${recipe.id}`)
        .set('Cookie', user)
        .send()
        .expect(204);
    
});