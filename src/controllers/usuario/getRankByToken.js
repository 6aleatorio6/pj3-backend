import createController from '../../helpers/createController.js';
import { prismaPaiado } from '../../services/customPrisma/prismaController.js';

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
export default createController(async (req, res) => {
  const dataAtual = new Date();

  // terminarei mais tarde
  const rank = prismaPaiado.lidoPeloUser.groupBy({
    by: ['usuario_id'],
    _count: { _all: true },
    where: {
      dataDaDescoberta: {
        gte: new Date(dataAtual.getFullYear(), dataAtual.getMonth(), 1),
      },
    },
    take: 30,
  });


  res.json({ message: 'sucesso', rank });
});
