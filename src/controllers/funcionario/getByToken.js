import createController from '../../helpers/createController.js';
import { prismaPaiado } from '../../services/customPrisma/prismaController.js';

/**
 *
 *  Endpoint da tela Profile
 *
 *  tipo: GET
 *  autenticação: somente ADM
 *
 *  Criado para ser usado no:
 *      SITE
 */
export default createController(async (req, res) => {
  const id = +req.user.id;

  const funcionario = await prismaPaiado.funcionario.findFirstOrThrow({
    select: {
      id: true,
      email:true,
      cpf:true,
      nome: true,
      foto: true,
    },
    where: { id },
  });


  res.json({ message: `Funcionario ${funcionario.nome} encontrado `, funcionario });
});
