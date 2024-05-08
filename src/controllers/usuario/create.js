import createController from '../../helpers/createController.js';
import { reqValidy } from '../../services/validacao/reqValidy.js';
import { allValid } from '../../services/validacao/allValidations.js';
import { prismaPaiado } from '../../services/customPrisma/prismaController.js';
import { gerarHash } from '../../services/auth/bcrypt.js';

/**
 *  Endpoint de cadastro de usuario
 *
 *  tipo: POST
 *  autenticação: Não precisa
 *
 *  Criado para ser usado no:
 *      APP MOBILE
 */
export default createController(async (req, res) => {
  reqValidy(req, {
    body: {
      apelido: 'required',
      email: 'required',
      senha: allValid.senha.transform(gerarHash),
    },
  });

  const usuario = await prismaPaiado.usuario.create({
    simularUnique: ['email'],
    select: {
      id: true,
      apelido: true,
      email: true,
    },
    data: req.body,
  });

  res.json({ success: `Usuário ${usuario.id} criado com sucesso!`, usuario });
});
