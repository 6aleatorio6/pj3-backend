import createController from '../../helpers/createController.js';
import { prismaPaiado } from '../../services/customPrisma/prismaController.js';
import { reqValidy } from '../../services/validacao/reqValidy.js';

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
  reqValidy(req, {
    params: {
      id: 'required',
    },
  });

  const fun = await prismaPaiado.funcionario.delete({
    select: {
      nome: true,
      roles: true,
      id: true,
    },
    where: { id: req.params.id },
  });

  res.json({ message: `Funcionario '${fun.nome}' removido`, fun });
});
