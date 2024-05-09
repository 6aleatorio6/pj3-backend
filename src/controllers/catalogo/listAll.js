import createController from '../../helpers/createController.js';
import { prismaPaiado } from '../../services/customPrisma/prismaController.js';

/**
 *  Endpoint para buscar todos os item do catalogo
 *
 *  tipo: GET
 *  autenticação: ADM ou USUARIO
 *
 *  Criado para ser usado no:
 *      SiTE ou APP
 */
export default createController(async (req, res) => {
  const cata = await prismaPaiado.catalogo.findMany({
    select: {
      uuid: true,
      nomeCientifico: true,
      nascimento: true,
      estrela: true,
      descricao: true,
      foto: true,
      medalha: true,
      som: true,
      nomePopular: true,
    },
  });

  res.json({
    message: `todos os item do catalogo buscados!`,
    cata,
  });
});
