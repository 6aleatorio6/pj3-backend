import endpointBoxSafe from '../../services/secureController/handlerBox.js';
import { reqValidy } from '../../services/validacao/reqValidy.js';
import { prismaPaiado } from '../../prisma.js';

/**
 *  Endpoint para procurar item no catalogo
 *
 *  tipo: GET
 *  autenticação: ADM ou USUARIO
 *
 *  Criado para ser usado no:
 *      SiTE ou APP
 */
export default endpointBoxSafe(async (req, res) => {
  reqValidy(req, {
    params: {
      uuid: 'required',
    },
  });

  const cata = await prismaPaiado.catalogo.findFirstOrThrow({
    where: {
      uuid: req.params.uuid,
    },
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
    message: `item '${cata.nome}' buscado!`,
    cata,
  });
});
