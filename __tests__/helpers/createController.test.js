import supertest from 'supertest';
import createController from '../../src/helpers/createController.js';
import express from 'express';

function supertestCreateController(endpoint) {
  const app = express();

  app.use('/teste/', endpoint);

  return supertest(app).get('/teste');
}

describe('helper createController', () => {
  it('tudo certo', async () => {
    const request = await supertestCreateController(
      createController((req, res) => {
        res.json({ message: 'paiaPaiosa' });
      }),
    );

    expect(request.body).toEqual({ message: 'paiaPaiosa' });
    expect(request.statusCode).toBe(200);
  });

  it('deu erro, mas sem erroCallback definido', async () => {
    const request = await supertestCreateController(
      createController((req, res) => {
        throw new Error('paia morreu');
      }),
    );

    expect(request.body).toEqual({
      error: 'Houve um erro no nosso servidor, tente novamente!',
    });
    expect(request.statusCode).toBe(500);
  });

  it('deu erro, mas com erroCallback definido', async () => {
    const request = await supertestCreateController(
      createController(
        (req, res) => {
          throw new Error('paia morreu');
        },
        (er) => {
          return {code: 400, msg: er.message}
        },
      ),
    );

    expect(request.body).toEqual({
      error: 'paia morreu',
    });
    expect(request.statusCode).toBe(400);
  });

  it('deu erro, mas com erroCallback definido, porem só com a msg', async () => {
    const request = await supertestCreateController(
      createController(
        (req, res) => {
          throw new Error('paia morreu');
        },
        (er) => {
          return {msg: er.message}
        },
      ),
    );

    expect(request.body).toEqual({
      error: 'paia morreu',
    });
    expect(request.statusCode).toBe(500);
  });
});
