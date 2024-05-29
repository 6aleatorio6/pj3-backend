import createController from '../../helpers/createController.js';
import { prismaPaiado } from '../../services/customPrisma/prismaController.js';
import { reqValidy } from '../../services/validacao/reqValidy.js';

/**
 *  Endpoint da tela de adm
 *
 *  tipo: DELETE
 *  autenticação: somente ADM
 *
 *  OBS: se não tiver id no params ele pegara do token
 *
 *  Criado para ser usado no:
 *      SITE
 */
export default createController(async (req, res) => {
  reqValidy(req, {
    params: {
      id: 'partial',
    },
  });

  const id = req.params.id || +req.user.id;

  const fun = await prismaPaiado.funcionario.delete({
    select: {
      nome: true,
      roles: true,
      id: true,
    },
    where: { id },
  });

  res.json({ message: `Funcionario '${fun.nome}' removido`, fun });
});
