import supertest from 'supertest';
import app from '../../src/app.js';
import { prismaPaiado } from '../../src/services/customPrisma/prismaController.js';

const api = supertest(app);

describe('e2e: controller usuario', () => {
  let token;

  beforeAll(async () => {
    await prismaPaiado.usuario.deleteMany();
  });

  it('POST: /usuario', async () => {
    const res = await api.post('/usuario').send({
      apelido: 'Paia Cabral',
      email: 'paia@gmail.com',
      senha: '1234',
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.usuario).toHaveProperty('id');
    expect(res.body).toHaveProperty('message');

    // email unico
    const res2 = await api.post('/usuario').send({
      apelido: 'Paia Cabral',
      email: 'paia@gmail.com',
      senha: '1234',
    });

    expect(res2.statusCode).toBe(400);
    expect(res2.body).toHaveProperty('message', 'esse email já foi usado');
  });

  it('POST: /usuario/login', async () => {
    const res = await api.post('/usuario/login').send({
      email: 'paia@gmail.com',
      senha: '1234',
    });

    token = res.body.token;
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body).toHaveProperty('message');

    // senha errada
    const res2 = await api.post('/usuario/login').send({
      email: 'paia@gmail.com',
      senha: 'paia',
    });

    expect(res2.statusCode).toBe(401);
  });

  it('GET: /usuario', async () => {
    const res = await api.get('/usuario/').auth(token, { type: 'bearer' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message');
    expect(res.body.usuario).toHaveProperty('apelido');
  });

  it('PUT: /usuario', async () => {
    const res = await api
      .put('/usuario/')
      .auth(token, { type: 'bearer' })
      .send({
        apelido: 'Paioso Cabral triste',
        sexo: 'M',
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message');
    expect(res.body.usuario).toHaveProperty('apelido', 'Paioso Cabral triste');
    expect(res.body.usuario).toHaveProperty('sexo', 'M');
  });

  it('DELETE: /usuario', async () => {
    const res = await api.delete('/usuario/').auth(token, { type: 'bearer' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message');
    expect(res.body.usuario).toHaveProperty('id');

    // tentar apagar dnv
    const res2 = await api.delete('/usuario/').auth(token, { type: 'bearer' });

    expect(res2.statusCode).toBe(400);
    expect(res2.body).toHaveProperty('message', 'o usuario não existe.');
  });
});
