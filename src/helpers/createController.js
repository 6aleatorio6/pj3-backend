/**
 * @typedef {{code: number, msg:string}} erroObj
 * @typedef {import("express").Request} Req
 * @typedef {import("express").Response} Res
 *
 * @argument { (req:Req , res: Res) => Promise<any>} endpoint
 * @argument {(error) => Promise<erroObj> |  erroObj} errorCallback
 *
 */
export default function createController(endpoint, errorCallback) {
  return async (req, res) => {
    try {
      await endpoint(req, res);
    } catch (error) {
      console.log(error);
      const erroCustom = errorCallback ? await errorCallback(error) : {};
      const code = erroCustom.code || 500;
      const msg =
        erroCustom.msg || 'Houve um erro no nosso servidor, tente novamente!';

      return res.status(code).json({ error: msg });
    }
  };
}
