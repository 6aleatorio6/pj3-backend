import endpointBoxSafe from '../../services/secureController/handlerBox.js';
import { reqValidy } from '../../services/validacao/reqValidy.js';
import { prismaPaiado } from '../../services/customPrisma/prismaController.js';

/**
 *  Endpoint para verificar se o email está em uso
 *
 *  tipo: GET
 *  autenticação: Não precisa
 *
 *  Criado para ser usado no:
 *      APP MOBILE
 */
export default endpointBoxSafe(async (req, res) => {
  reqValidy(req, {
    query: {
      email: 'required',
    },
  });

  const user = await prismaPaiado.usuario.findFirst({
    select: { id: true },
    where: req.query,
  });

  res.json({
    message: user ? 'email em uso' : 'email disponivel',
    emailDisponivel: !user,
  });
});
