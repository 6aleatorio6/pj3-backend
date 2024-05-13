import createController from '../../helpers/createController.js';
import { prismaPaiado } from '../../services/customPrisma/prismaController.js';
import { reqValidy } from '../../services/validacao/reqValidy.js';

/**
 *
 *  Endpoint
 *
 *  tipo: GET
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

  const funcionario = await prismaPaiado.funcionario.findFirstOrThrow({
    select: {
      id: true,
      email: true,
      cpf: true,
      nome: true,
      foto: true,
    },
    where: { id },
  });

  res.json({
    message: `Funcionario ${funcionario.nome} encontrado `,
    funcionario,
  });
});
