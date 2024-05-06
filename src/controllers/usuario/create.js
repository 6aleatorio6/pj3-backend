import prisma from '../../prisma.js';
import createController from '../../helpers/createController.js';
import { reqValidy } from '../../services/validacao/reqValidy.js';
import { paiarPrisma } from '../../helpers/prismaController.js';
import { allValid } from '../../services/validacao/allValidations.js';
import { hashSync } from 'bcrypt';

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
      senha: allValid.senha.transform((senha) => hashSync(senha, 15)),
    },
  });

  const responsePrisma = prisma.usuario.create({
    select: {
      id: true,
      apelido: true,
      email: true,
    },
    data: req.body,
  });

  const usuario = await paiarPrisma(responsePrisma, {
    simularUnique: {
      usuario: ['email', req.body.email],
    },
  });

  res.json({ success: `Usuário ${usuario.id} criado com sucesso!`, usuario });
});
