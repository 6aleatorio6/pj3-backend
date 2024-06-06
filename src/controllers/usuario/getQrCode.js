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
  const apelido = +req.user.apelido;


  if (uuid === 'qrcodetoten.com') {
    const qrCodeToten = await prismaPaiado.visitas.create({
      data: {
        usuario_id: id,
        dataDaVisita: new Date()
      }
    })
    res.json({
      message: `Visita do ${apelido} feita pelo app com sucesso`,
      qrCodeToten
    })
  }

  
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
