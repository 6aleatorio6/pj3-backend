import endpointBoxSafe from '../../services/secureController/handlerBox.js';
import {
  extractTokenFromHeader,
  jwtSign,
  jwtVerify,
} from '../../services/auth/helpersAuth.js';
import { HttpException } from '../../services/secureController/handlersPaia.js';
import { decode } from 'jsonwebtoken';
import { prismaPaiado } from '../../services/customPrisma/prismaController.js';

export default endpointBoxSafe(async (req, res) => {
  const token = extractTokenFromHeader(req);

  const RefreshIsValid = jwtVerify(token) === 'REFRESH';

  if (!RefreshIsValid)
    throw HttpException(
      400,
      'Não foi possivel atualizar o token, faça login novamente',
    );

  const { id, roles } = decode(token);

  // verificar se a conta ainda existe
  const model = roles === 'USER' ? 'usuario' : 'funcionario';
  const user = await prismaPaiado[model].findFirst({
    where: { id },
    select: { id: true },
  });

  console.log(user);
  if (!user) throw HttpException(400, 'conta da sessão não foi encontrada');

  res.status(200).json({
    message: 'token atualizado',
    token: jwtSign({ id, roles }),
  });
});
