import createController from '../../helpers/createController.js';
import { reqValidy } from '../../services/validacao/reqValidy.js';
import { prismaPaiado } from '../../services/customPrisma/prismaController.js';

/**
 *  Endpoint para atualizar um item do catalogo
 *
 *  tipo: PUT
 *  autenticação: somente ADM
 *
 *  Criado para ser usado no:
 *      SiTE
 */
export default createController(async (req, res) => {
  reqValidy(req, {
    params: {
      uuid: 'required',
    },
    body: {
      nomeCientifico: 'partial',
      nascimento: 'partial',
      estrela: 'partial',
      descricao: 'partial',
      foto: 'partial',
      medalha: 'partial',
      som: 'partial',
      nomePopular: 'partial',
    },
  });

  const cata = await prismaPaiado.catalogo.update({
    where: {
      uuid: req.params.uuid,
    },
    select: {
      uuid: true,
      nomePopular: true,
    },
    data: req.body,
  });

  res.json({
    message: `item '${cata.nome}' atualizado!`,
    cata,
  });
});
