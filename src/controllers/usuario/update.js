import { hashSync } from 'bcrypt';
import createController from '../../helpers/createController.js';
import { paiarPrisma } from '../../helpers/prismaController.js';
import prisma from '../../prisma.js';
import { allValid } from '../../services/validacao/allValidations.js';
import { reqValidy } from '../../services/validacao/reqValidy.js';

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
      senha: allValid.senha
        .optional()
        .transform((senha) => senha && hashSync(senha, 15)),
      foto: 'partial',
      apelido: 'partial',
      nome: 'partial',
      cidade: 'partial',
      sexo: 'partial',
    },
  });

  const responsePrisma = prisma.usuario.update({
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

  const usuario = await paiarPrisma(responsePrisma, {
    simularUnique: {
      usuario: ['email', req.body.email],
    },
  });

  res.json({ message: `Usuário ${id} atualizado`, usuario });
});
