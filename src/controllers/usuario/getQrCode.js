import { z } from 'zod';
import { prismaPaiado } from '../../prisma.js';
import endpointBoxSafe from '../../services/secureController/handlerBox.js';
import { qrCodeMAP } from '../../services/socket/connections/totem.js';
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
  reqValidy(req, { params: { uuid: z.string() } });

  const uuid = req.params.uuid;

  if (qrCodeMAP.has(uuid)) return res.redirect('/toten/qrcode/' + uuid);

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
          especie: true,
          ftModel: true,
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
