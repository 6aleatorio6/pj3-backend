import { HttpException } from '../secureController/handlersPaia.js';
import { prismaPaiado } from '../customPrisma/prismaController.js';
import { jwtSign } from './helpersAuth.js';

export default async function loginOrSignUp(payload) {
  const idModel = Object.keys(payload).find((k) => k.endsWith('Id'));

  if (!payload[idModel])
    throw new HttpException('400', 'id do oauth não foi fornecido');

  let user = await prismaPaiado.usuario.findFirst({
    where: { [idModel]: payload[idModel] },
    select: { id: true },
  });

  if (!user)
    user = await prismaPaiado.usuario.create({
      simularUnique: [idModel],
      data: {
        [idModel]: payload[idModel], // ex: googleId
        apelido: payload.id,
        foto: payload.foto,
      },
      select: {
        id: true,
      },
    });

  return jwtSign({
    id: user.id,
    roles: 'USER',
  });
}
