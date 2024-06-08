import endpointBoxSafe from '../secureController/handlerBox.js';
import { prismaPaiado } from '../../prisma.js';
import { reqValidy } from '../validacao/reqValidy.js';
import { HttpException } from '../secureController/handlersPaia.js';
import { compare } from 'bcrypt';

/**
 *
 * @param {"funcionario" | "usuario"} tabelaDaConta
 * @returns
 */
export default function middleLogin(tabelaDaConta) {
  return endpointBoxSafe(async (req, res, next) => {
    reqValidy(req, {
      body: {
        email: 'required',
        senha: 'required',
      },
    });
    const { email, senha } = req.body;

    const conta = await prismaPaiado[tabelaDaConta].findUnique({
      where: { email },
      select: {
        id: true,
        senha: true,
        roles: tabelaDaConta === 'funcionario',
      },
    });
    const isValid = conta && (await compare(senha, conta.senha));

    if (!isValid) throw new HttpException(400, 'email ou senha invalida');

    req.user = {
      id: conta.id,
      roles: conta.roles || 'USER',
    };
    console.log(req.user);
    next();
  });
}
