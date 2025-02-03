import request from 'supertest';
import app from '../../../app';
import { Recipe } from '../../models/recipe';

it('has a route handler listening to /api/recipes to create recipes', async () => {
  const response = await request(app).post('/api/recipes').send({});

  expect(response.status).not.toEqual(404);
}, 50000);

it('can only be accessed if the user is signed in', async () => {
  await request(app).post('/api/recipes').send({}).expect(401);
});

it('returns a status other than 401 if the user is signed in', async () => {
  const response = await request(app)
    .post('/api/recipes')
    .set('Cookie',await global.signin())
    .send({});

  expect(response.status).not.toEqual(401);
});

it('returns an error if an invalid title is provided', async () => {
  await request(app)
    .post('/api/recipes')
    .set('Cookie', await global.signin())
    .send({
        description: 'description',
    })
    .expect(400);
});

it('returns an error if an invalid description is provided', async () => {
  await request(app)
    .post('/api/recipes')
    .set('Cookie', await global.signin())
    .send({
      title: 'laskdfj',
    })
    .expect(400);
});

it('creates a ticket with valid inputs', async () => {
  let recipes = await Recipe.find({});
  expect(recipes.length).toEqual(0);

  const title = 'asldkfj';

  await request(app)
    .post('/api/recipes')
    .set('Cookie', await global.signin())
    .send({
      title,
      description: 'description',
    })
    .expect(201);

  recipes = await Recipe.find({});

  expect(recipes.length).toEqual(1);
  expect(recipes[0].description).toEqual('description');
  expect(recipes[0].title).toEqual(title);
});