import endpointBoxSafe from '../../services/secureController/handlerBox.js';
import { reqValidy } from '../../services/validacao/reqValidy.js';
import { allValid } from '../../services/validacao/allValidations.js';
import { prismaPaiado } from '../../prisma.js';
import { gerarHash } from '../../services/auth/helpersAuth.js';

/**
 *  Endpoint de cadastro de usuario
 *
 *  tipo: POST
 *  autenticação: Não precisa
 *
 *  Criado para ser usado no:
 *      APP MOBILE
 */
export default endpointBoxSafe(async (req, res) => {
  reqValidy(req, {
    body: {
      apelido: 'required',
      email: 'required',
      senha: allValid.senha.transform(gerarHash),
    },
  });

  const usuario = await prismaPaiado.usuario.create({
    select: {
      id: true,
      apelido: true,
      email: true,
    },
    data: req.body,
  });

  res.json({
    message: `Usuário ${usuario.apelido} criado com sucesso!`,
    usuario,
  });
});
