// eslint-disable-next-line no-unused-vars
import { z, ZodObject } from 'zod';
import { HttpException } from '../secureController/handlersPaia.js';
import { allValid } from './allValidations.js';

/**
 *  Serve para validar o request do endpoint
 *
 *  AVISO:Só funciona dentro do endpointBoxSafe
 *
 * @typedef {{[key in keyof typeof allValid]: "required" | "partial" | ZodObject}} Validacao
 *
 * @argument { {body:Validacao, params: Validacao, query: Validacao}} validObj
 */
export function reqValidy(req, validObj) {
  const { body, params, query } = validObj;

  converterNumParaOtipoCerto(req.params);
  converterNumParaOtipoCerto(req.query);
  // converterNumParaOtipoCerto(req.body);

  if (params) req.params = validy(params, req.params);
  if (query) req.query = validy(query, req.query);
  if (body) req.body = validy(body, req.body);
}

function validy(validObj, data) {
  const { zPick, zPartial, zRequired, zCustom } = dividirObj(validObj);

  const result = z
    .object(allValid)
    .pick(zPick)
    .partial(zPartial)
    .required(zRequired)
    .extend(zCustom)
    .safeParse(data || {});

  if (!result.success)
    throw new HttpException(
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
  const objDivido = { zPick: {}, zPartial: {}, zRequired: {}, zCustom: {} };

  for (const key in validObj) {
    const element = validObj[key];

    const isString = typeof element === 'string';

    if (!isString) {
      objDivido.zCustom[key] = element;
      continue;
    }

    objDivido.zPick[key] = true;

    const isRequired = element === 'required';
    const keyObj = isRequired ? 'zRequired' : 'zPartial';
    objDivido[keyObj][key] = true;
  }

  return objDivido;
}

function converterNumParaOtipoCerto(objeto = {}) {
  Object.entries(objeto).forEach(([key, v]) => {
    if (!isNaN(v)) objeto[key] = Number(v);
  });
}
