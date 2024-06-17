import relatorioModel from "../../services/pdfGenerate/relatorioModel.js";
import generatePDF from "../../services/pdfGenerate/pdfGenerator.js";
import generateHTML from "../../services/pdfGenerate/templates/generatePDFemHTML.js";
import calcularIdade from "../../helpers/calcularIdade.js";
import visitasDateHandler from "../../helpers/visitasDateHandler.js";
import limparFiltro from "../../helpers/limparFiltro.js";

const todosUsuariosPDF = async (req, res) => {
    try {
        const filtro = limparFiltro(req.body)
        // const filtro = limparFiltro({
        //     sexo: "F",
        //     // cidade: "Cidade1",
        //     cidade: "",
        //     email: undefined,
        //     foto: undefined,
        //     dataDaVisitaMin: "2024-022226-01",
        //     dataDaVisitaMax: "30/06/2024",
        //     numeroVisitas: null,
        //     puleVisitas: ""
        // })

        // Define as datas se não estiverem presentes no filtro
        const newFiltro = visitasDateHandler(filtro)
        if (!newFiltro.dataDaVisitaMax || !newFiltro.dataDaVisitaMin) {
            return res.status(400).json({error: "formato da data mínima ou data máxima informadas é inválido."})
        }

        const resultado = await relatorioModel.totalVisitas(newFiltro)
        console.log(resultado);
        resultado.visitas[1].usuario.nascimento

        const htmlContent = generateHTML(resultado.visitas)
        const pdf = await generatePDF(htmlContent)
        res.contentType('application/pdf')

        res.send(pdf)
        // res.send('deu certo karai')
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Houve um erro no nosso servidor, tente novamente!' })
    }
}

export default todosUsuariosPDF