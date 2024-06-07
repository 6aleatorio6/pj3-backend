import endpointBoxSafe from '../../services/secureController/handlerBox.js';
import { prismaPaiado } from '../../prisma.js';

/**
 *  Endpoint da tela de configurações
 *
 *  tipo: DELETE
 *  autenticação: somente USER
 *
 *  Criado para ser usado no:
 *      APP MOBILE
 */
export default endpointBoxSafe(async (req, res) => {
  const id = +req.user.id;

  const usuario = await prismaPaiado.usuario.delete({
    select: {
      id: true,
      apelido: true,
      nome: true,
    },
    where: { id },
  });

  res.json({ message: `Usuário ${usuario.apelido} removido`, usuario });
});
