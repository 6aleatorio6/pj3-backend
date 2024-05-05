import createController from '../../helpers/createController.js';
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

  const usuario = await prisma.usuario.findUnique({
    select: {
      apelido: true,
      foto: true,
    },
    where: {
      id,
    },
  });

  res.json({ message: `Usuário ${id} encontrado com sucesso`, usuario });
});
