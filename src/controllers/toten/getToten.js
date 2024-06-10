import { prismaPaiado } from '../../prisma.js';
import endpointBoxSafe from '../../services/secureController/handlerBox.js';
import { reqValidy } from '../../services/validacao/reqValidy.js';
import { z } from 'zod';

export default endpointBoxSafe(async (req, res) => {
  reqValidy(req, {
    params: {
      dataToten: z.coerce.date(),
    },
  });

  const horaToten = req.params.dataToten;

  const getToten = await prismaPaiado.visitas.findFirstOrThrow({
    where: { dataDaVisita: { gte: horaToten } },
  });

  res.json({
    message: `Visita ${getToten.id} encontrada com sucesso`,
    getToten,
  });
});
