import request from 'supertest';
import app from '../../../app';

it('restituisce un 201 in caso di registrazione riuscita', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test2@test.com',
            password: 'password'
        })
        .expect(201);
}, 3000);

it("restituisce un 400 con un'e-mail non valida", async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'testest.com',
            password: 'password'
        })
        .expect(400);
});

it('restituisce un 400 con una password non valida', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'p'
        })
        .expect(400);
});

it('restituisce un 400 con email o password mancanti', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com'
        })
        .expect(400);

    await request(app)
        .post('/api/users/signup')
        .send({
            password: 'password'
        })
        .expect(400);
});

it('non consente email duplicate', async () => {
    await request(app)
    .post('/api/users/signup')
    .send({
        email: 'test@test.com',
        password: 'password'
    })
    .expect(201);

    await request(app)
    .post('/api/users/signup')
    .send({
        email: 'test@test.com',
        password: 'password'
    })
    .expect(400);
});

it('imposta un cookie dopo la registrazione riuscita', async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test2@test.com',
            password: 'password'
        })
        .expect(201);
    expect(response.get('Set-Cookie')).toBeDefined();
})