import createController from '../../helpers/createController.js';
import { allValid } from '../../services/validacao/allValidations.js';
import { reqValidy } from '../../services/validacao/reqValidy.js';
import { prismaPaiado } from '../../services/customPrisma/prismaController.js';
import { gerarHash } from '../../services/auth/bcrypt.js';

/**
 *  Endpoint da tela de configurações
 *
 *  tipo: UPDATE
 *  autenticação: somente USER
 *
 *  Criado para ser usado no:
 *      APP MOBILE
 */
export default createController(async (req, res) => {
  const id = +req.user.id;

  reqValidy(req, {
    body: {
      senha: allValid.senha.optional().transform(gerarHash),
      foto: 'partial',
      apelido: 'partial',
      nome: 'partial',
      cidade: 'partial',
      sexo: 'partial',
    },
  });

  const usuario = await prismaPaiado.usuario.update({
    simularUnique: ['email'],
    select: {
      apelido: true,
      foto: true,
      nome: true,
      email: true,
      cidade: true,
      sexo: true,
      id: true,
    },
    data: req.body,
    where: { id },
  });

  res.json({ message: `Usuário ${usuario.apelido} atualizado`, usuario });
});
