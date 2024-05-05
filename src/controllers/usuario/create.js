import prisma from '../../prisma.js';
import createController from '../../helpers/createController.js';
import { reqValidy } from '../../services/validacao/reqValidy.js';

/**
 *  Endpoint de cadastro de usuario
 *
 *  tipo: POST
 *  autenticação: Não precisa
 *
 *  Criado para ser usado no:
 *      APP MOBILE
 */
export default createController(async (req, res) => {
  reqValidy(req, {
    body: {
      apelido: true,
      nome: true,
      email: true,
    },
  });

  const usuario = await prisma.usuario.create({
    select: {
      id: true,
      apelido: true,
      email: true,
    },
    data: req.body,
  });

  res.json({ success: `Usuário ${usuario.id} criado com sucesso!`, usuario });
});
