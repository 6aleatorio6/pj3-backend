import endpointBoxSafe from '../../services/secureController/handlerBox.js';
import { prismaPaiado } from '../../prisma.js';
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
export default endpointBoxSafe(async (req, res) => {
  reqValidy(req, {
    params: {
      id: 'partial',
    },
  });

  const id = req.params.id || req.user.id;

  const funcionario = await prismaPaiado.funcionario.findFirstOrThrow({
    select: {
      id: true,
      email: true,
      cpf: true,
      nome: true,
      roles: true,
    },
    where: { id },
  });

  res.json({
    message: `Funcionario ${funcionario.nome} encontrado `,
    funcionario,
  });
});
