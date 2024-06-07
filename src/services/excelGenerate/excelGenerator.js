import ExcelJS from 'exceljs';

const criacaoExcel = async (users) => {
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
            { header: 'Idade', key: 'age', width: 16 },
            { header: 'Email', key: 'email', width: 30 },
            { header: 'Cidade', key: 'city', width: 20 },
        ];

        // for (let index = 0; index < users.length; index++) {
        //     const element = users[index];
        //     worksheet.addRow({
        //         name: element.nome,
        //         sex: element.sexo,
        //         age: element.nascimento,
        //         email: element.email? element.email : "não possui",
        //         city: element.cidade? element.cidade: "não informou"})
        // }

        users.forEach(user => {
            worksheet.addRow({
                name: user.nome,
                sex: user.sexo,
                age: user.nascimento,
                email: user.email ? user.email : "não possui",
                city: user.cidade ? user.cidade : "não informou"
            })
        });

        // //usar for nesta parte para cada visita
        // worksheet.addRow({id: 1, name: 'João', email: 'joao@email.com'});
        // worksheet.addRow({id: 2, name: 'Maria', email: 'maria@email.com'});
        // worksheet.addRow({id: 2, name: 'Maria', email: 'maria@email.com'});
        // worksheet.addRow({name: 'Maria', email: 'maria@email.com'});


        const excelFile = `relatorioDeVisitas${formatarTimestampParaData()}.xlsx`
        await workbook.xlsx.writeFile(excelFile);
        console.log("Arquivo criado com sucesso!");
        console.log("teste do excel", excelFile);
        return excelFile
    }

    return await createWorkbook();

}

export default criacaoExcel