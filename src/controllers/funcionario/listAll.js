import createController from '../../helpers/createController.js';
import { prismaPaiado } from '../../services/customPrisma/prismaController.js';

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
export default createController(async (req, res) => {
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
