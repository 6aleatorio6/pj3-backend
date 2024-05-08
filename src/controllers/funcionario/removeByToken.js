import createController from '../../helpers/createController.js';
import { prismaPaiado } from '../../services/customPrisma/prismaController.js';

/**
 *  Endpoint da tela de configurações
 *
 *  tipo: DELETE
 *  autenticação: somente ADM
 *
 *  Criado para ser usado no:
 *      SITE
 */
export default createController(async (req, res) => {
  const id = +req.user.id;

  const fun = await prismaPaiado.funcionario.delete({
    select: {
      nome: true,
      id: true,
    },
    where: { id },
  });

  res.json({ message: `Funcionario '${fun.nome}' removido`, fun });
});
