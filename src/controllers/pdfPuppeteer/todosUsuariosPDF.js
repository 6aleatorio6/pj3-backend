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

const limparFiltro = (filtro) => {
    for (const prop in filtro) {
        if (filtro[prop] === null || filtro[prop] === "" || filtro[prop] === undefined) {
            delete filtro[prop];
        }
    }
    return filtro;
};

const todosUsuariosPDF = async (req, res) => {
    try {
        console.log(req.body);
        const filtro = limparFiltro(req.body)
        console.log(filtro);
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

        const resultado = await relatorioModel.totalVisitas(filtro)
        console.log(resultado);
        
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