import endpointBoxSafe from '../../services/secureController/handlerBox.js';
import { prismaPaiado } from '../../services/customPrisma/prismaController.js';
import prisma from '../../prisma.js';
import { reqValidy } from '../../services/validacao/reqValidy.js';

export default endpointBoxSafe(async (req, res) => {
  reqValidy(req, {
    body: {
      nome: 'required',
      cidade: 'required',
      sexo: 'required',
      nascimento: 'required',
    },
  });

  const usuarioParcial = await prismaPaiado.usuario.create({
    select: {
      id: true,
      nome: true,
      cidade: true,
      sexo: true,
      nascimento: true,
      visitas: true,
    },
    data: {
      ...req.body,
      visitas: {
        create: {
          dataDaVisita: new Date(),
        },
      },
    },
  });

  res.json({
    message: `Visita ${usuarioParcial.visitas.id} do usuário ${usuarioParcial.nome} criado com sucesso!`,
    usuarioParcial,
    visitas: usuarioParcial.visitas,
  });
});
