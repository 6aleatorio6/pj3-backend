import { prismaPaiado } from '../../prisma.js';
import endpointBoxSafe from '../../services/secureController/handlerBox.js';
import { reqValidy } from '../../services/validacao/reqValidy.js';

/**
 *
 *  Endpoint do qrCode
 *
 *  tipo: GET
 *  autenticação: somente USER
 *
 *  Criado para ser usado no:
 *      APP MOBILE
 */
export default endpointBoxSafe(async (req, res) => {
  reqValidy(req, { params: { uuid: 'required' } });

  const id = +req.user.id;
  const apelido = req.user.apelido;
  const uuid = req.params.uuid;

  if (uuid === 'qrcodetoten.com') {
    const qrCodeToten = await prismaPaiado.visitas.create({
      data: {
        usuario_id: id,
        dataDaVisita: new Date(),
      },
    });
    return res.json({
      message: `Visita do ${apelido} feita pelo app com sucesso`,
      qrCodeToten,
    });
  }

  const { catalogo } = await prismaPaiado.lidoPeloUser.create({
    data: {
      usuario: { connect: { id: req.user.id } },
      catalogo: { connect: { uuid: req.params.uuid } },
    },
    select: {
      catalogo: {
        select: {
          uuid: true,
          medalha: true,
          som: true,
          nomePopular: true,
          nomeCientifico: true,
          estrela: true,
          ftPerfil: true,
          descricao: true,
          catalogoGaleria: true,
        },
      },
    },
  });

  res.json({
    message: `Catalogo encontrado`,
    catalogo,
  });
});
