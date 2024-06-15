import endpointBoxSafe from '../../services/secureController/handlerBox.js';
import { prismaPaiado } from '../../prisma.js';

/**
 *  Endpoint para buscar todos os item do catalogo
 *
 *  tipo: GET
 *  autenticação: ADM ou USUARIO
 *
 *  Criado para ser usado no:
 *      SiTE ou APP
 */
export default endpointBoxSafe(async (req, res) => {
  const cata = await prismaPaiado.catalogo.findMany({
    select: {
      uuid: true,
      nomeCientifico: true,
      especie: true,
      descricao: true,
      catalogoGaleria: true,
      medalha: true,
      som: true,
      ftModel: true,
      nomePopular: true,
    },
  });

  res.json({
    message: `todos os item do catalogo buscados!`,
    cata,
  });
});
