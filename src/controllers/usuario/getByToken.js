import createController from '../../helpers/createController.js';
import { paiarPrisma } from '../../helpers/prismaController.js';
import prisma from '../../prisma.js';

/**
 *
 *  Endpoint da tela Profile
 *
 *  tipo: GET
 *  autenticação: somente USER
 *
 *  Criado para ser usado no:
 *      APP MOBILE
 */
export default createController(async (req, res) => {
  const id = +req.user.id;

  const responsePrisma = prisma.usuario.findFirstOrThrow({
    select: {
      apelido: true,
      foto: true,
    },
    where: { id },
  });

  const usuario = await paiarPrisma(responsePrisma);

  res.json({ message: `Usuário ${id} encontrado com sucesso`, usuario });
});
