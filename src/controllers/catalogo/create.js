import endpointBoxSafe from '../../services/secureController/handlerBox.js';
import { reqValidy } from '../../services/validacao/reqValidy.js';
import { prismaPaiado } from '../../prisma.js';

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
      nomePopular: 'required',
      descricao: 'required',
      estrela: 'required',
      medalha: 'required',
      som: 'required',
      ftModel: 'required',

      // estou usando o zod para transformar o valor recebido. Se for modificar veja em `/src/services/validacao/allValidations.js`
      catalogoGaleria: 'required',
    },
  });

  const { catalogoGaleria, ...rest } = req.body;

  const cata = await prismaPaiado.catalogo.create({
    select: {
      uuid: true,
      nomePopular: true,
    },
    data: {
      funcionario_autor: { connect: { id: req.user.id } },
      catalogoGaleria: {
        createMany: {
          data: catalogoGaleria,
        },
      },
      ...rest,
    },
  });

  res.json({
    message: `item '${cata.nome}' add ao catalogo!`,
    cata,
  });
});
