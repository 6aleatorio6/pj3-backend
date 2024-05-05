import { ErrorController } from './erroController.js';

/**
 * @typedef {import("express").Request} Req
 * @typedef {import("express").Response} Res
 *
 * @argument { (req:Req , res: Res) => Promise<any>} endpoint
 */
export default function createController(endpoint) {
  return async (req, res) => {
    try {
      await endpoint(req, res);
    } catch (erroBruto) {
      const { code, message, details } =
        ErrorController.getInfoError(erroBruto);

      res.status(code).json({ message, details });
    }
  };
}
