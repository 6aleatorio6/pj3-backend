import createController from '../../helpers/createController.js';
import prisma from '../../prisma.js';
import { validations } from '../../services/validacao/allValidations.js';

/**
 *  Endpoint de cadastro de usuario
 *
 *  autenticação: Não precisa
 *
 *  Criado para ser usado no:
 *      -APP MOBILE
 */
export default createController(
  {
    apelido: true,
    nome: true,
    email: validations.pick({ email: true }),
  },
  async (req, res) => {
    const data = req.body;

    const { id: isUsedEmail } = await prisma.usuario.findFirst({
      select: { id: true },
      where: {
        email: true,
        deleted_at: null,
      },
    });

    // eslint-disable-next-line no-throw-literal
    if (isUsedEmail) throw { code: 400, msg: 'esse email está sendo usado' };

    const usuario = await prisma.usuario.create({
      data,
    });

    res.json({ success: `Usuário ${usuario.id} criado com sucesso!`, usuario });
  },
);
