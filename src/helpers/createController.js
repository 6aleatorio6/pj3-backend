/* eslint-disable no-unused-vars */
import { allValid } from '../services/validacao/allValidations.js';
import { ZodObject } from 'zod';
import { validy } from '../services/validacao/validador.js';
import { ErrorController } from './erroController.js';

/**
 * @typedef {import("express").Request} Req
 * @typedef {import("express").Response} Res
 *
 * @typedef { (req:Req , res: Res) => Promise<any>} Endpoint
 * @typedef {{[key in keyof typeof allValid._type]: true | ZodObject}} Validacao
 *
 * @argument {{endpoint: Endpoint,validacao: {body:Validacao, params: Validacao, query: Validacao}}} config
 */
export default function createController({ validacao, endpoint }) {
  return async (req, res) => {
    try {
      req.params = validy(validacao.params, req.params);
      req.query = validy(validacao.query, req.query);
      req.body = validy(validacao.body, req.body);

      await endpoint(req, res);
    } catch (erroBruto) {
      const { code, message, details } =
        ErrorController.getInfoError(erroBruto);

      res.status(code).json({ message, details });
    }
  };
}
