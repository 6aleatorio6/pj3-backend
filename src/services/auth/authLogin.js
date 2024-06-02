import endpointBoxSafe from '../secureController/handlerBox.js';
import { prismaPaiado } from '../customPrisma/prismaController.js';
import { reqValidy } from '../validacao/reqValidy.js';
import { HttpException } from '../secureController/handlersPaia.js';
import { compare } from 'bcrypt';

/**
 *
 * @param {"funcionario" | "usuario"} TipoDaConta
 * @returns
 */
export default function middleLogin(TipoDaConta) {
  return endpointBoxSafe(async (req, res, next) => {
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

    if (!isValid) throw new HttpException(401, 'email ou senha invalida');

    req.user = {
      id: conta.id,
      roles: conta.roles || 'USER',
    };

    next();
  });
}
