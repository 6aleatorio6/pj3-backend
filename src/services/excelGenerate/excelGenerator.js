import ExcelJS from 'exceljs';

const generateExcel = async (visitas) => {
    const formatarTimestampParaData = () => {
        const timestamp = Date.now();
        const data = new Date(timestamp);
        const novaData = data.toLocaleDateString().replaceAll('/', '-');
        return novaData;
    };

    async function createWorkbook() {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Minha Planilha');

        worksheet.columns = [
            { header: 'Nome', key: 'name', width: 20 },
            { header: 'Sexo', key: 'sex', width: 10 },
            { header: 'Nascimento', key: 'age', width: 16 },
            { header: 'Email', key: 'email', width: 30 },
            { header: 'Cidade', key: 'city', width: 20 },
        ];

        visitas.forEach(visita => {
            worksheet.addRow({
                name: visita.usuario.nome,
                sex: visita.usuario.sexo,
                age: visita.usuario.nascimento,
                email: visita.usuario.email ? visita.usuario.email : "não possui",
                city: visita.usuario.cidade ? visita.usuario.cidade : "não informou"
            })
        });

        const excelFile = `relatorioDeVisitas${formatarTimestampParaData()}.xlsx`
        await workbook.xlsx.writeFile(excelFile);
        console.log("Arquivo criado com sucesso!");
        console.log("teste do excel", excelFile);
        return excelFile
    }

    return await createWorkbook();

}

export default generateExcel