import request from 'supertest';
import app from '../../../src/app';
import { jwtSign } from '../../../src/services/auth/helpersAuth.js';
import { UserNovoEach } from '../../helpers.js';

describe('GET /usuario', () => {
  const token = jwtSign({ id: 1, roles: 'USER' });

  const objUserZerado = { id: -1, token: '' };
  UserNovoEach(objUserZerado);

  it('deve retornar os detalhes do usuário quando um token válido for fornecido', async () => {
    const response = await request(app)
      .get('/usuario')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.usuario).toHaveProperty('id');
    expect(response.body.usuario).toHaveProperty('apelido');
    expect(response.body.usuario).toHaveProperty('lidoPeloUser');
    expect(response.body.usuario.progresso).toEqual({ lido: 1, total: 6 });
    expect(response.body.usuario.lidoPeloUser.length).toBe(1);
    expect(response.body.usuario.catalogoNLido.length).toBe(5);
    expect(response.body.usuario.foto).toBe(null);
  });

  it('Get de um usuario Novo', async () => {
    const response = await request(app)
      .get('/usuario')
      .set('Authorization', `Bearer ${objUserZerado.token}`);

    expect(response.status).toBe(200);
    expect(response.body.usuario).toHaveProperty('lidoPeloUser');
    expect(response.body.usuario.progresso).toEqual({ lido: 0, total: 6 });
    expect(response.body.usuario.catalogoNLido.length).toBe(6);
    expect(response.body.usuario.lidoPeloUser.length).toBe(0);
  });

  it('deve retornar status 401 quando nenhum token é fornecido', async () => {
    const response = await request(app)
      .get('/usuario')
      .set('Authorization', `Bearer `);

    expect(response.body).toEqual({ message: 'sem token de sessão' });
    expect(response.status).toBe(401);
  });

  it('deve retornar status 401 quando um token inválido for fornecido', async () => {
    const response = await request(app)
      .get('/usuario')
      .set('Authorization', `Bearer ${'token invalido'}`);

    expect(response.body).toEqual({ message: 'token de sessão invalido' });
    expect(response.status).toBe(401);
  });
});
