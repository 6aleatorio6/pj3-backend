import createController from '../../helpers/createController.js';
import { allValid } from '../../services/validacao/allValidations.js';
import { reqValidy } from '../../services/validacao/reqValidy.js';
import { prismaPaiado } from '../../services/customPrisma/prismaController.js';
import { gerarHash } from '../../services/auth/bcrypt.js';

/**
 *  Endpoint da tela de configurações
 *
 *  tipo: UPDATE
 *  autenticação: somente ADM
 *
 *  Criado para ser usado no:
 *      SITE
 */
export default createController(async (req, res) => {
  const id = +req.user.id;

  reqValidy(req, {
    body: {
      senha: allValid.senha.optional().transform(gerarHash),
      foto: 'partial',
      nome: 'partial',
      cpf: 'partial',
    },
  });

  const func = await prismaPaiado.funcionario.update({
    simularUnique: ['email'],
    select: {
      foto: true,
      nome: true,
      email: true,
      id: true,
    },
    data: req.body,
    where: { id },
  });

  res.json({ message: `Usuário ${func.nome} atualizado`, func });
});
