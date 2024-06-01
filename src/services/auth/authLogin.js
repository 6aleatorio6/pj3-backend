import createPaia from '../../helpers/createController.js';
import { prismaPaiado } from '../customPrisma/prismaController.js';
import { reqValidy } from '../validacao/reqValidy.js';
import { ErrorController } from '../../helpers/erroController.js';
import { compare } from 'bcrypt';

/**
 *
 * @param {"funcionario" | "usuario"} TipoDaConta
 * @returns
 */
export default function middleLogin(TipoDaConta) {
  return createPaia(async (req, res, next) => {
    reqValidy(req, {
      body: {
        email: 'required',
        senha: 'required',
      },
    });

    const { email, senha } = req.body;
    const { tipoDeConta } = req.params;

    const conta = await prismaPaiado[TipoDaConta].findUnique({
      where: { email },
      select: {
        id: true,
        senha: true,
        roles: tipoDeConta === 'funcionario',
      },
    });

    const isValid = conta && (await compare(senha, conta.senha));

    if (!isValid) throw new ErrorController(401, 'email ou senha invalida');

    req.user = {
      id: conta.id,
      roles: conta.roles || 'USER',
    };

    next();
  });
}
