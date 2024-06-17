/* eslint-disable camelcase */
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

  usuario.catalogoNLido = catalogo.filter(
    ({ uuid }) =>
      !usuario.lidoPeloUser.some(({ catalogo_uuid }) => uuid === catalogo_uuid),
  );

  usuario.lidoPeloUser = usuario.lidoPeloUser.map((lido) => ({
    ...lido,
    catalogo: catalogo.find((item) => item.uuid === lido.catalogo_uuid),
    catalogo_uuid: undefined,
  }));

  usuario.progresso = {
    total: catalogo.length,
    lido: usuario.lidoPeloUser.length,
  };

  res.json({
    message: `Usuário ${usuario.apelido} encontrado com sucesso`,
    usuario,
  });
});
