import createController from '../../helpers/createController.js';
import { prismaPaiado } from '../../services/customPrisma/prismaController.js';
import { reqValidy } from '../../services/validacao/reqValidy.js';

export default createController( async (req, res) => {

    let dataAtual = new Date()

    reqValidy(req, {
        body: {
            nome: 'required',
            cidade: 'required',
            sexo: 'required',
            nascimento: 'required'
        }
    })

    req.body.nascimento = dataAtual.setFullYear(dataAtual.getFullYear() - req.body.nascimento)

    const usuarioParcial = await prismaPaiado.usuario.create({
        select: {
            id: true,
            nome: true,
            cidade: true,
            sexo: true,
            nascimento: true,
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

    res.json({  message: `Visita ${visita} do usuário ${usuarioParcial} criado com sucesso!`, usuarioParcial, visita })
})