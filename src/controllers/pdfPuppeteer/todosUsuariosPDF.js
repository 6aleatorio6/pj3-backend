import relatorioModel from "../../services/pdfGenerate/relatorioModel.js";
import generatePDF from "../../services/pdfGenerate/pdfGenerator.js";
import generateHTML from "../../services/pdfGenerate/templates/generatePDFemHTML.js";
import moment from "moment";

const formatarData = (data) => {
    // Tenta formatar a data em diferentes formatos aceitos
    const formatos = ['YYYY-MM-DD', 'DD-MM-YYYY', 'YYYY/MM/DD', 'DD/MM/YYYY'];

    for (const formato of formatos) {
        const dataFormatada = moment(data, formato, true);
        if (dataFormatada.isValid()) {
            return dataFormatada.toISOString();
        }
    }
    return null; // Caso nenhum formato seja válido
};

const todosUsuariosPDF = async (req, res) => {
    try {
        const filtro = req.body.filtro
         // Define as datas se não estiverem presentes no filtro
         const hoje = new Date();
         const umMesAFrente = new Date();
         umMesAFrente.setMonth(hoje.getMonth() + 1);
 
         // Formatação das datas para o formato ISO 8601
         const dataHojeFormatada = hoje.toISOString();
         const dataUmMesAFrenteFormatada = umMesAFrente.toISOString();
 
         if (!filtro.dataDaVisitaMin) {
            filtro.dataDaVisitaMin = dataHojeFormatada;
        } else {
            const dataFormatada = formatarData(filtro.dataDaVisitaMin);
            if (dataFormatada) {
                filtro.dataDaVisitaMin = dataFormatada;
            } else {
                return res.status(400).json({ error: 'Formato de dataDaVisitaMin inválido' });
            }
        }

        if (!filtro.dataDaVisitaMax) {
            filtro.dataDaVisitaMax = dataUmMesAFrenteFormatada;
        } else {
            const dataFormatada = formatarData(filtro.dataDaVisitaMax);
            if (dataFormatada) {
                filtro.dataDaVisitaMax = dataFormatada;
            } else {
                return res.status(400).json({ error: 'Formato de dataDaVisitaMax inválido' });
            }
        }
        
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