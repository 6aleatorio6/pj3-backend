import { HttpException } from '../secureController/handlersPaia.js';
import { prismaPaiado } from '../../prisma.js';
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
      data: {
        [idModel]: payload[idModel], // ex: googleId
        apelido: payload.apelido,
        foto: payload.foto,
        email: payload.email,
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
