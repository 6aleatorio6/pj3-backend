import endpointBoxSafe from '../../services/secureController/handlerBox.js';
import { prismaPaiado } from '../../prisma.js';

/**
 *
 *  Endpoint da tela Profile
 *
 *  tipo: GET
 *  autenticação: somente USER
 *
 *  Criado para ser usado no:
 *      APP MOBILE
 */
export default endpointBoxSafe(async (req, res) => {
  const id = +req.user.id;

  const usuario = await prismaPaiado.usuario.findFirstOrThrow({
    select: {
      id: true,
      apelido: true,
      foto: true,
      lidoPeloUser: {
        distinct: ['catalogo_uuid'],
        select: { dataDaDescoberta: true, catalogo: true },
        orderBy: { dataDaDescoberta: 'asc' },
      },
    },
    where: { id },
  });

  res.json({
    message: `Usuário ${usuario.apelido} encontrado com sucesso`,
    usuario,
  });
});
