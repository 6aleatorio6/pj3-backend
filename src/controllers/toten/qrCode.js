import { z } from 'zod';
import { prismaPaiado } from '../../prisma.js';
import endpointBoxSafe from '../../services/secureController/handlerBox.js';
import { HttpException } from '../../services/secureController/handlersPaia.js';
import { qrCodeMAP } from '../../services/socket/connections/totem.js';
import { reqValidy } from '../../services/validacao/reqValidy.js';

export default endpointBoxSafe(async (req, res) => {
  reqValidy(req, {
    params: { hash: z.string() },
  });

  const { hash } = req.params;

  if (!qrCodeMAP.has(hash))
    throw new HttpException(404, 'QRCode não encontrado');

  const allInfoNecessaria = await prismaPaiado.usuario.findFirst({
    select: { nome: true },
    where: {
      id: req.user.id,
      nome: { not: null },
      sexo: { not: null },
      cidade: { not: null },
      nascimento: { not: null },
    },
  });

  if (!allInfoNecessaria)
    throw new HttpException(400, 'Falta informações', 'FALTA');

  await prismaPaiado.visitas.create({
    data: { usuario: { connect: { id: req.user.id } } },
  });

  qrCodeMAP.get(hash)(allInfoNecessaria.nome);

  qrCodeMAP.delete(hash);

  res.json({ message: 'Visita realizada', details: 'OK' });
});
