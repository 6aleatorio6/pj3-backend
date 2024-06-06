import endpointBoxSafe from '../../services/secureController/handlerBox.js';
import { prismaPaiado } from '../../prisma.js';

/**
 *
 *  Endpoint  que busca todos os funcionarios
 *
 *  tipo: GET
 *  autenticação: somente ADM
 *
 *  Criado para ser usado no:
 *      SITE
 */
export default endpointBoxSafe(async (req, res) => {
  const funcionario = await prismaPaiado.funcionario.findMany({
    select: {
      id: true,
      email: true,
      cpf: true,
      nome: true,
      foto: true,
      roles: true,
    },
  });

  res.json({
    message: `todos os funcionarios `,
    funcionario,
  });
});
