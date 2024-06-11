import fs from 'fs';
import generateExcel from '../../services/excelGenerate/excelGenerator.js';
import relatorioModel from "../../services/pdfGenerate/relatorioModel.js";
import visitasDateHandler from "../../helpers/visitasDateHandler.js";
import limparFiltro from "../../helpers/limparFiltro.js";

const todasVisitasExcel = async (req, res) => {
    try {
        const filtro = limparFiltro(req.body)
        // const filtro = limparFiltro({
        //     sexo: "F",
        //     // cidade: "Cidade1",
        //     cidade: "",
        //     email: undefined,
        //     foto: undefined,
        //     dataDaVisitaMin: "2023-06-01",
        //     dataDaVisitaMax: "30/06/2023",
        //     numeroVisitas: null,
        //     puleVisitas: ""
        // })

        // Define as datas se não estiverem presentes no filtro
        const newFiltro = visitasDateHandler(filtro)
        if (!newFiltro.dataDaVisitaMax || !newFiltro.dataDaVisitaMin) {
            return res.status(400).json({ error: "formato da data mínima ou data máxima informadas é inválido." })
        }
        const resultado = await relatorioModel.totalVisitas(newFiltro)

        //  no navegador:    http://localhost:3000/excel/listar-usuarios
        const Excelgerate = await generateExcel(resultado.visitas)

        res.download(Excelgerate, (err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: 'Houve um erro ao enviar o arquivo!' });
            }
        });
        // Espera 10 segundos antes de deletar o arquivo
        setTimeout(() => {
            fs.unlink(Excelgerate, (err) => {
                if (err) {
                    console.error(`Erro ao deletar o arquivo: ${err}`);
                } else {
                    console.log('Arquivo deletado com sucesso!');
                }
            });
        }, 10000); // 10000 ms = 10 segundos
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Houve um erro no nosso servidor, tente novamente!' })
    }
}

export default todasVisitasExcel

