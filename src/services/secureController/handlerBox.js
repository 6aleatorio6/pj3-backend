import { HttpException } from './handlersPaia.js';

/**
 * @typedef {import("express").Request} Req
 * @typedef {import("express").Response} Res
 * @typedef {import("express").NextFunction} Next
 *
 * @argument { (req:Req , res: Res, next: Next) => Promise<any>} endpoint
 */
export default function endpointBoxSafe(endpoint) {
  return async (req, res, next) => {
    try {
      await endpoint(req, res, next);
    } catch (erroBruto) {
      const { code, message, details } = HttpException.getInfoError(erroBruto);

      res.status(code).json({ message, details });
    }
  };
}
