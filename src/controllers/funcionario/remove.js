import endpointBoxSafe from '../../services/secureController/handlerBox.js';
import { prismaPaiado } from '../../prisma.js';
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
export default endpointBoxSafe(async (req, res) => {
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
