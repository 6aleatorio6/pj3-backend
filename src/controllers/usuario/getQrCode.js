import endpointBoxSafe from '../../services/secureController/handlerBox.js';
import { prismaPaiado } from '../../services/customPrisma/prismaController.js';
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

  const { catalogo } = await prismaPaiado.lidoPeloUser.create({
    data: {
      usuario_id: id,
      catalogo_uuid: req.params.uuid,
    },
    select: {
      catalogo: true,
    },
  });

  res.json({
    message: `Catalogo encontrado`,
    catalogo,
  });
});
