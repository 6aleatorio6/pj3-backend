import endpointBoxSafe from '../../services/secureController/handlerBox.js';
import { allValid } from '../../services/validacao/allValidations.js';
import { reqValidy } from '../../services/validacao/reqValidy.js';
import { prismaPaiado } from '../../prisma.js';
import { gerarHash } from '../../services/auth/helpersAuth.js';

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
export default endpointBoxSafe(async (req, res) => {
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

  const id = req.params.id || req.user.id;

  const func = await prismaPaiado.funcionario.update({
    select: {
      nome: true,
      email: true,
      id: true,
    },
    data: req.body,
    where: { id },
  });

  res.json({ message: `Funcionario ${func.nome} atualizado`, func });
});
