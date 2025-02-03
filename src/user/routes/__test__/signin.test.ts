import request from 'supertest';
import app from '../../../app';

it("fallisce quando viene fornita un'e-mail che non esiste", async () => {
    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test2@test.com',
            password: 'password'
        })
        .expect(400);
});

it('fallisce quando viene fornita una password errata', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);
    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: 'another'
        })
        .expect(400);
});

it('risponde con un cookie quando vengono fornite credenziali valide', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test2@test.com',
            password: 'password'
        })
        .expect(201);
    const response = await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test2@test.com',
            password: 'password'
        })
        .expect(200);
    
    expect(response.get('Set-Cookie')).toBeDefined();
});
