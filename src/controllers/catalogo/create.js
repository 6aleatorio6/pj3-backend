import endpointBoxSafe from '../../services/secureController/handlerBox.js';
import { reqValidy } from '../../services/validacao/reqValidy.js';
import { prismaPaiado } from '../../services/customPrisma/prismaController.js';

/**
 *  Endpoint de cadastro do catalogo
 *
 *  tipo: POST
 *  autenticação: somente ADM
 *
 *  Criado para ser usado no:
 *      SiTE
 */
export default endpointBoxSafe(async (req, res) => {
  reqValidy(req, {
    body: {
      nomeCientifico: 'required',
      nascimento: 'required',
      estrela: 'required',
      descricao: 'required',
      foto: 'required',
      medalha: 'required',
      som: 'required',
      nomePopular: 'required',
    },
  });

  const cata = await prismaPaiado.catalogo.create({
    select: {
      uuid: true,
      nomePopular: true,
    },
    data: req.body,
  });

  res.json({
    message: `item '${cata.nome}' add ao catalogo!`,
    cata,
  });
});
