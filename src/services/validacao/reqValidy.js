// eslint-disable-next-line no-unused-vars
import { ZodObject } from 'zod';
import { ErrorController } from '../../helpers/erroController.js';
import { allValid } from './allValidations.js';

/**
 *  Serve para validar o request do endpoint
 *
 *  AVISO:Só funciona dentro do createController
 *
 * @typedef {{[key in keyof typeof allValid._type]: true | ZodObject}} Validacao
 *
 * @argument { {body:Validacao, params: Validacao, query: Validacao}} validObj
 */
export function reqValidy(req, validObj) {
  const { body, params, query } = validObj;

  converterNumParaOtipoCerto(req.params);
  converterNumParaOtipoCerto(req.query);
  converterNumParaOtipoCerto(req.body);

  if (params) req.params = validy(params, req.params);
  if (query) req.query = validy(query, req.query);
  if (body) req.body = validy(body, req.body);
}

function validy(validObj, data) {
  const [zPartials, zCustom] = dividirObj(validObj);

  const result = allValid
    .pick(zPartials)
    .extend(zCustom)
    .safeParse(data || {});

  if (!result.success)
    throw new ErrorController(
      400,
      'dados invalidos ou incompleto, tente novamente',
      {
        validationErrors: result.error.issues.map((v) => ({
          fieldName: v.path[0],
          fieldError: v.message,
        })),
      },
    );

  return result.data;
}

function dividirObj(validObj) {
  const objDivido = [{}, {}];

  for (const key in validObj) {
    const element = validObj[key];

    const isBoolean = typeof element === 'boolean';

    objDivido[isBoolean ? 0 : 1][key] = element;
  }

  return objDivido;
}

function converterNumParaOtipoCerto(objeto = {}) {
  Object.entries(objeto).forEach(([key, v]) => {
    if (!isNaN(v)) objeto[key] = Number(v);
  });
}
