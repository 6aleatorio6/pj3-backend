import createController from '../../helpers/createController.js';
import { prismaPaiado } from '../../services/customPrisma/prismaController.js';

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

  const usuario = await prismaPaiado.usuario.findFirstOrThrow({
    select: {
      id: true,
      apelido: true,
      foto: true,
    },
    where: { id },
  });

  res.json({
    message: `Usuário ${usuario.apelido} encontrado com sucesso`,
    usuario,
  });
});
