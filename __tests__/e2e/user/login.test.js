import app from '../../../src/app.js';
import { prismaPaiado } from '../../../src/prisma.js';
import { gerarHash } from '../../../src/services/auth/helpersAuth.js';
import supertest from 'supertest';

const request = supertest(app);

describe('Login (user)', () => {
  beforeAll(() => {
    jest.spyOn(prismaPaiado.usuario, 'findFirst').mockResolvedValue({
      id: 1,
      email: 'paia@gmail.com',
      senha: gerarHash('1234'),
    });
  });

  it('senha ou email incorreto', async () => {
    const res = await request.post('/usuario/login').send({
      email: 'asdasd@asdasd.com',
      senha: 'asdasd',
    });

    expect(res.body).toEqual({ message: 'email ou senha invalida' });
    expect(res.statusCode).toBe(400);
  });

  it('email e senha certos', async () => {
    const res = await request.post('/usuario/login').send({
      email: 'paia@gmail.com',
      senha: '1234',
    });

    expect(res.body).toHaveProperty('token');
    expect(res.body).toHaveProperty('user');
    expect(res.statusCode).toBe(200);
  });
});
