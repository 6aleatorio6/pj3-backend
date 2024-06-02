import endpointBoxSafe from '../../services/secureController/handlerBox.js';
import { reqValidy } from '../../services/validacao/reqValidy.js';
import { prismaPaiado } from '../../services/customPrisma/prismaController.js';

/**
 *  Endpoint para deletar um item do catalogo
 *
 *  tipo: DELETE
 *  autenticação: somente ADM
 *
 *  Criado para ser usado no:
 *      SiTE
 */
export default endpointBoxSafe(async (req, res) => {
  reqValidy(req, {
    params: {
      uuid: 'required',
    },
  });

  const cata = await prismaPaiado.catalogo.delete({
    where: {
      uuid: req.params.uuid,
    },
    select: {
      uuid: true,
      nomePopular: true,
    },
  });

  res.json({
    message: `item '${cata.nome}' excluido do catalogo!`,
    cata,
  });
});
