import ExcelJS from 'exceljs';

const criacaoExcel = async(users)=> {

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
            { header: 'Sexo', key: 'sex', width: 5 },
            { header: 'Idade', key: 'age', width: 7},
            { header: 'Email', key: 'email', width: 20},
            { header: 'Cidade', key: 'city', width: 20},
        ];

        users.forEach(user => {
            worksheet.addRow({
                name: user.nome, 
                sex: user.sexo, 
                age: user.nascimento, 
                email: user.email? user.email : "não possui", 
                city: user.cidade? user.cidade: "não informou"})
        });
        // //usar for nesta parte para cada visita
        // worksheet.addRow({id: 1, name: 'João', email: 'joao@email.com'});
        // worksheet.addRow({id: 2, name: 'Maria', email: 'maria@email.com'});
        // worksheet.addRow({id: 2, name: 'Maria', email: 'maria@email.com'});
        // worksheet.addRow({id: 2, name: 'Maria', email: 'maria@email.com'});



        const excel = await workbook.xlsx.writeFile(`relatorioDeVisitas${formatarTimestampParaData()}.xlsx`);
        console.log("Arquivo criado com sucesso!");
    }

    createWorkbook();

}

export default criacaoExcel