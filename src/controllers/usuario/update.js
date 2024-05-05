import createController from '../../helpers/createController.js';
import prisma from '../../prisma.js';
import { reqValidy } from '../../services/validacao/reqValidy.js';

/**
 *  Endpoint da tela de configurações
 *
 *  tipo: UPDATE
 *  autenticação: somente USER
 *
 *  Criado para ser usado no:
 *      APP MOBILE
 */
export default createController(async (req, res) => {
  const id = +req.user.id;

  reqValidy(req, {
    body: {
      apelido: true,
      nome: true,
      email: true,
      cidade: true,
      cpf: true,
      nascimento: true,
      sexo: true,
      senhaHash: true,
    },
  });

  const usuario = await prisma.usuario.update({
    select: {
      apelido: true,
      nome: true,
      email: true,
      cidade: true,
      cpf: true,
      nascimento: true,
      sexo: true,
      id: true,
    },
    data: req.body,
    where: {
      id,
    },
  });

  res.json({ message: `Usuário ${id} atualizado`, usuario });
});
