import {
  validations,
  // eslint-disable-next-line no-unused-vars
  validationsMessages,
} from '../services/validacao/allValidations.js';

/**
 * @typedef {{code: number, msg:string}} erroObj
 * @typedef {import("express").Request} Req
 * @typedef {import("express").Response} Res
 *
 * @argument { (req:Req , res: Res) => Promise<any>} endpoint
 * @argument {(error) => Promise<erroObj> |  erroObj} errorCallback
 * @argument {{[key in keyof typeof validationsMessages]: any}} validBody
 *
 */
export default function createController(validBody, endpoint, errorCallback) {
  return async (req, res) => {
    try {
      validy(validBody).parse({
        ...req.body,
        ...req.query,
        ...req.params,
      });

      await endpoint(req, res);
    } catch (error) {
      console.log(error);

      const erroCustom = errorCallback ? await errorCallback(error) : {};
      const code = erroCustom.code || error.code || 500;
      const msg =
        erroCustom.msg ||
        error.msg ||
        'Houve um erro no nosso servidor, tente novamente!';

      return res.status(code).json({ error: msg });
    }
  };
}

/**
 *  @argument {{[key in keyof typeof validationsMessages]: boolean | ZodAny}} validObj
 */
function validy(validObj) {
  const valids = [{}, {}];

  for (const key in validObj) {
    const element = validObj[key];
    // eslint-disable-next-line no-unused-expressions
    typeof element === 'boolean' ? valids[0][key] : valids[1][key];
  }

  const [zPartials, zCustom] = valids;

  return validations.partial(zPartials).extend(zCustom);
}

createController(null, null, { apelido: true });
