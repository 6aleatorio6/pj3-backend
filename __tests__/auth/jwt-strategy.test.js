import app from '../../src/app.js';
import supertest from 'supertest';
import {
  acessoApenasPara,
  jwtSign,
} from '../../src/services/auth/jwt-strategy.js';
import jwt from 'jsonwebtoken';

const resMock = (req, res) => res.json(req.user);
app.get('/teste/totem', acessoApenasPara('TOTEM'), resMock);
app.get('/teste/user', acessoApenasPara('USER'), resMock);
app.get('/teste/user&adm', acessoApenasPara('USER', 'ADM'), resMock);

const request = supertest(app);

const tokenData = {
  id: 1,
  roles: 'USER',
};

async function reqTest(rota, token, notSign) {
  if (!notSign) token = jwtSign(token);
  const res = await request
    .get('/teste/' + rota)
    .set('Authorization', `Bearer ${token}`);

  if (res.error) console.log(res.error);

  return res;
}

describe('jwt-strategy', () => {
  it('céu azul | token certo e rota permitida para USER', async () => {
    const response = await reqTest('user', tokenData);

    expect(response.ok).toBeTruthy();
    expect(response.body).toHaveProperty('id');
  });

  it('céu azul | token certo e rota permitida para USER e ADM', async () => {
    const responseUser = await reqTest('user&adm', tokenData);
    const responseADM = await reqTest('user&adm', { id: 123, roles: 'ADM' });

    expect(responseADM.ok).toBeTruthy();
    expect(responseADM.body).toHaveProperty('id');
    expect(responseUser.ok).toBeTruthy();
    expect(responseUser.body).toHaveProperty('id');
  });

  it('céu azul | token certo e rota permitida para TOTEM', async () => {
    const response = await reqTest('totem', { id: 123, roles: 'TOTEM' });

    expect(response.ok).toBeTruthy();
    expect(response.body).toHaveProperty('id');
  });

  it('céu triste | token invalido', async () => {
    const tokenSuspeito = jwt.sign(tokenData, 'secket confiavel');

    const response = await reqTest('user', tokenSuspeito, true);

    expect(response.unauthorized).toBeTruthy();
    // teria mensagem tbm se o passport n fosse tao paioso e maldito
    // custava ter uma opcao de msg personalizada em json? :(
  });

  it('céu triste | nao autorizado', async () => {
    const response = await reqTest('user', { id: 123, roles: 'TOTEM' });

    expect(response.forbidden).toBeTruthy();
    expect(response.body).toHaveProperty('message');
  });
});
