import createController from '../../helpers/createController.js';
import { allValid } from '../../services/validacao/allValidations.js';
import { reqValidy } from '../../services/validacao/reqValidy.js';
import { prismaPaiado } from '../../services/customPrisma/prismaController.js';
import { gerarHash } from '../../services/auth/bcrypt.js';

/**
 *  Endpoint da tela de configurações
 *
 *  tipo: PUT
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
      id: 'required',
    },
    body: {
      senha: allValid.senha.optional().transform(gerarHash),
      foto: 'partial',
      nome: 'partial',
      cpf: 'partial',
    },
  });

  const id = req.params.id || +req.user.id;

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

  res.json({ message: `Funcionario ${func.nome} atualizado`, func });
});
