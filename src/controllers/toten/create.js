import createController from '../../helpers/createController.js';
import { prismaPaiado } from '../../services/customPrisma/prismaController.js';
import { reqValidy } from '../../services/validacao/reqValidy.js';

export default createController( async (req, res) => {
    reqValidy(req, {
        body: {
            nome: 'required',
            cidade: 'required',
            sexo: 'required',

        }
    })

    const usuarioParcial = await prismaPaiado.usuario.create({
        select: {
            id: true,
            nome: true,
            cidade: true,
            sexo: true,
        }, 
        data: {
            visitas: {
            create: [
                {
                    dataDaVisita: new Date(),

                }
            ]
        }},

        data: req.body
    })

    const visita = await prismaPaiado.visita.create({
        id: true
    })

    res.json({ sucess: `Visita`})
})