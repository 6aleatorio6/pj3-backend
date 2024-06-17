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
  reqValidy(req, { params: { uuid: 'required' } });

  const uuid = req.params.uuid;

  if (qrCodeMAP.has(uuid)) {
    const allInfoNecessaria = await prismaPaiado.usuario.findFirst({
      select: { apelido: true },
      where: {
        id: req.user.id,
        nome: { not: null },
        sexo: { not: null },
        cidade: { not: null },
        nascimento: { not: null },
      },
    });

    if (!allInfoNecessaria)
      return res.json({ message: 'Falta informações', status: 'FALTA' });

    qrCodeMAP.get(uuid)(allInfoNecessaria.apelido);

    qrCodeMAP.delete(uuid);

    return res.json({ message: 'Visita realizada', status: 'OK' });
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
