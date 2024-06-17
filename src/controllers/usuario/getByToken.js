/* eslint-disable camelcase */
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
  const usuario = await prismaPaiado.usuario.findFirstOrThrow({
    select: {
      id: true,
      apelido: true,
      foto: true,
      lidoPeloUser: {
        distinct: ['catalogo_uuid'],
        select: {
          dataDaDescoberta: true,
          catalogo_uuid: true,
        },
        orderBy: { dataDaDescoberta: 'asc' },
      },
    },
    where: { id: req.user.id },
  });

  const catalogo = await prismaPaiado.catalogo.findMany({
    select: {
      uuid: true,
      nomePopular: true,
      nomeCientifico: true,
      especie: true,
      ftModel: true,
      medalha: true,
    },
  });

  usuario.catalogoNLido = [];
  for (const item of catalogo) {
    usuario.lidoPeloUser.forEach((itemLido) => {
      const isRead = item.uuid === itemLido.catalogo_uuid;

      if (!isRead) return usuario.catalogoNLido.push(item);

      itemLido.catalogo = item;
      delete itemLido.catalogo_uuid;
    });
  }

  usuario.progresso = {
    total: catalogo.length,
    lido: usuario.lidoPeloUser.length,
  };

  res.json({
    message: `Usuário ${usuario.apelido} encontrado com sucesso`,
    usuario,
  });
});
