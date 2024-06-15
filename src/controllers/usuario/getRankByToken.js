import endpointBoxSafe from '../../services/secureController/handlerBox.js';
import { prismaPaiado } from '../../prisma.js';

/**
 *
 *  Endpoint da tela RANK
 *
 *  tipo: GET
 *  autenticação: somente USER
 *
 *  Criado para ser usado no:
 *      APP MOBILE
 */
export default endpointBoxSafe(async (req, res) => {
  const dataAtual = new Date();

  // terminarei mais tarde
  let rank = await prismaPaiado.usuario.findMany({
    select: {
      apelido: true,
      foto: true,
      lidoPeloUser: {
        distinct: ['catalogo_uuid'],
        select: { id: true },
        where: {
          dataDaDescoberta: {
            gte: new Date(dataAtual.getFullYear(), dataAtual.getMonth(), 1),
          },
        },
      },
    },

    take: 15,
  });

  rank = rank.map(({ apelido, foto, lidoPeloUser }) => ({
    apelido,
    foto,
    qrCodeUnicosLidos: lidoPeloUser.length,
  }));

  res.json({ message: 'sucesso ao requisitar o rank', rank });
});
