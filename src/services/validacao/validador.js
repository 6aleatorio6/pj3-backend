import { ErrorController } from '../../helpers/erroController.js';
import { allValid } from './allValidations.js';

/**
 * @description essa função pega um objeto e divide em propriedades com zod e booleanos e as usam para montar um objeto de validacao zod
 *
 * @argument {{[key in keyof typeof validationsMessages]: true | ZodObject}} validObj
 */
export function validy(validObj, data) {
  const valids = [{}, {}];

  for (const key in validObj) {
    const element = validObj[key];

    valids[typeof element === 'boolean' ? 0 : 1][key] = element;
  }

  const [zPartials, zCustom] = valids;

  const result = allValid.pick(zPartials).extend(zCustom).safeParse(data);
  console.log(data);
  if (!result.success)
    throw new ErrorController(
      400,
      'dados invalidos ou incompleto, tente novamente',
      {
        camposInvalidos: result.error.issues.map((v) => ({
          nome: v.path[0],
          erro: v.message,
        })),
      },
    );

  return result.data;
}
