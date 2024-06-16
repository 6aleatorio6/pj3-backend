import request from 'supertest';
import app from '../../../src/app';
import { jwtSign } from '../../../src/services/auth/helpersAuth.js';

describe('GET /usuario/rank', () => {
  const token = jwtSign({ id: 1, roles: 'USER' });

  it('Sucesso', async () => {
    const response = await request(app)
      .get('/usuario/rank')
      .set('Authorization', `Bearer ${token}`);

    expect(response.body.rank).toHaveLength(1);
    expect(response.body.rank[0]).toHaveProperty('id');
    expect(response.body.rank[0]).toHaveProperty('apelido', 'leoleo');
    expect(response.body.rank[0]).toHaveProperty('qrCodeUnicosLidos', 1);
    expect(response.body.rank[0]).toHaveProperty('isCurrentUser', true);
    expect(response.body.rank[0]).toHaveProperty('foto', null);

    expect(response.status).toBe(200);
  });
});
