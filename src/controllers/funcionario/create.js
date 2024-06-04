import endpointBoxSafe from '../../services/secureController/handlerBox.js';
import { reqValidy } from '../../services/validacao/reqValidy.js';
import { allValid } from '../../services/validacao/allValidations.js';
import { prismaPaiado } from '../../services/customPrisma/prismaController.js';
import { gerarHash } from '../../services/auth/helpersAuth.js';

/**
 *  Endpoint de cadastro de funcionario
 *
 *  tipo: POST
 *  autenticação: somente funcionario
 *
 *  Criado para ser usado no:
 *      SiTE
 */
export default endpointBoxSafe(async (req, res) => {
  reqValidy(req, {
    body: {
      roles: 'required',
      nome: 'required',
      cpf: 'required',
      email: 'required',
      senha: allValid.senha.transform(gerarHash),
    },
  });

  const funcionario = await prismaPaiado.funcionario.create({
    simularUnique: ['email'],
    select: {
      id: true,
      email: true,
      nome: true,
      roles: true,
    },
    data: req.body,
  });

  res.json({
    message: `Funcionario ${funcionario.nome} criado com sucesso!`,
    funcionario,
  });
});
