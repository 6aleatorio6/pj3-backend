import endpointBoxSafe from '../../services/secureController/handlerBox.js';
import { allValid } from '../../services/validacao/allValidations.js';
import { reqValidy } from '../../services/validacao/reqValidy.js';
import { prismaPaiado } from '../../services/customPrisma/prismaController.js';
import { gerarHash } from '../../services/auth/helpersAuth.js';

/**
 *  Endpoint da tela de configurações
 *
 *  tipo: PUT
 *  autenticação: somente USER
 *
 *  Criado para ser usado no:
 *      APP MOBILE
 */
export default endpointBoxSafe(async (req, res) => {
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
