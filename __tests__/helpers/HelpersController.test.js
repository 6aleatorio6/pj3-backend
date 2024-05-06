import supertest from 'supertest';
import createController from '../../src/helpers/createController.js';
import express, { json } from 'express';
import { ErrorController } from '../../src/helpers/erroController.js';
import { reqValidy } from '../../src/services/validacao/reqValidy.js';

function supertestCreateController(endpoint) {
  const app = express();

  app.use('/teste/', endpoint);

  return supertest(app).get('/teste');
}

function returnMsgErrorValid(...fieldErros) {
  return {
    message: 'dados invalidos ou incompleto, tente novamente',
    details: {
      validationErrors: fieldErros,
    },
  };
}

describe('helpers Controller', () => {
  it('céu azul', async () => {
    const request = await supertestCreateController(
      createController((req, res) => {
        res.json({ message: 'paiaPaiosa' });
      }),
    );

    expect(request.body).toEqual({ message: 'paiaPaiosa' });
    expect(request.statusCode).toBe(200);
  });

  describe('erros', () => {
    it('erro desconhecido', async () => {
      const request = await supertestCreateController(
        createController((req, res) => {
          throw new Error('paia morreu');
        }),
      );

      expect(request.body).toEqual({
        message: 'erro interno no servidor',
      });
      expect(request.statusCode).toBe(500);
    });

    it('erro com erroController', async () => {
      const request = await supertestCreateController(
        createController((req, res) => {
          throw new ErrorController(406, 'não foi aceito', { paia: 123 });
        }),
      );

      expect(request.body).toEqual({
        message: 'não foi aceito',
        details: {
          paia: 123,
        },
      });
      expect(request.statusCode).toBe(406);
    });
  });

  describe('validacao', () => {
    let appSuper = supertest();

    beforeAll(() => {
      const app = express();
      app.use(json());

      const endpoint = createController((req, res) => {
        reqValidy(req, {
          query: {
            id: 'required',
          },
          body: {
            nome: 'required',
          },
        });

        res.json({ ...req.body, ...req.query });
      });

      app.post('/teste/?', endpoint);

      appSuper = supertest(app);
    });

    it('céu azul com validacao', async () => {
      const res = await appSuper.post('/teste/?id=10').send({
        nome: 'paia',
      });

      expect(res.body).toEqual({ nome: 'paia', id: 10 });
      expect(res.statusCode).toBe(200);
    });

    it('Fornecendo o tipo errado para o campo (body) ', async () => {
      const res = await appSuper.post('/teste/?id=10').send({
        nome: 10,
      });

      expect(res.body).toEqual(
        returnMsgErrorValid({
          fieldError: 'Expected string, received number',
          fieldName: 'nome',
        }),
      );
      expect(res.statusCode).toBe(400);
    });

    it('Fornecendo o tipo errado para o campo (query)', async () => {
      const res = await appSuper.post('/teste/?id=paia').send({
        nome: 'paia',
      });

      expect(res.body).toEqual(
        returnMsgErrorValid({
          fieldError: 'Expected number, received string',
          fieldName: 'id',
        }),
      );
      expect(res.statusCode).toBe(400);
    });

    it('Fornecendo mais dados do que deveria', async () => {
      const res = await appSuper.post('/teste/?id=10').send({
        nome: 'paia',
        paiaSuspeito: 'estou paiando voce',
      });

      // paiaSuspeito foi morto
      expect(res.body).toEqual({ nome: 'paia', id: 10 });
      expect(res.statusCode).toBe(200);
    });
  });
});
