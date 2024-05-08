import relatorioModel from "../../services/pdfGenerate/relatorioModel.js";
import compileTemplate from "../../services/pdfGenerate/templateCompiler.js";
import generatePDF from "../../services/pdfGenerate/pdfGenerator.js";
import generateHTML from "../../services/pdfGenerate/templates/generatePDFemHTML.js";

const todosUsuariosPDF = async (req, res) => {
    try {
        const filtro = req.body.filtro
        const resultado = await relatorioModel.totalUsuarios(filtro)
        // const htmlContent = await compileTemplate(generateHTML, resultado) //antiga formatação html
        const htmlContent = generateHTML(resultado) // Usando o generateHTML para gerar o HTML ao invez do compileTemplate
        const pdf = await generatePDF(htmlContent)
        res.contentType('application/pdf')
        
        res.send(pdf)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Houve um erro no nosso servidor, tente novamente!' })
    }
}

export default todosUsuariosPDF