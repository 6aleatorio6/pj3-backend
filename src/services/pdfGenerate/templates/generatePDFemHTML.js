import countVisitas from "../../../helpers/countVisitas.js";

const formatarData = (nascimento) => {
    const data = new Date(nascimento);
    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const ano = data.getFullYear().toString();
    const dataFormatada = `${dia}/${mes}/${ano}`;

    return dataFormatada
}

const generateHTML = (visitas) => {

    visitas.forEach
    let linhas = [];
    visitas.forEach(visita => {
        linhas.push(`<tr><td>${visita.usuario.sexo}</td><td>${visita.usuario.nome}</td><td>${formatarData(visita.dataDaVisita)}</td><td>${visita.usuario.email ? visita.usuario.email : "não possui"}</td><td>${visita.usuario.cidade ? visita.usuario.cidade : "não informou"}</td></tr>`);
    });

    let Graficos = `
    
    <div style="width: 50%; margin: auto;" id="chartContainer">
        <canvas id="myPieChart1"></canvas>
        <canvas id="myPieChart2"></canvas>
        <canvas id="myPieChart3"></canvas>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels"></script>
    <script>
        // Dados do primeiro gráfico de pizza
        const data1 = {
            labels: ['Masculino: ${countVisitas.visitasTiposSexo(visitas)[0]}', 'Feminino: ${countVisitas.visitasTiposSexo(visitas)[1]}', 'Outros: ${countVisitas.visitasTiposSexo(visitas)[2]}'],
            datasets: [{
                label: 'Sexos',
                data: [${countVisitas.visitasTiposSexo(visitas)}],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1
            }]
        };

        // Configuração do primeiro gráfico
        const config1 = {
            type: 'pie',
            data: data1,
            options: {
                responsive: true,
                animation: false,
                plugins: {
                    datalabels: {
                        color: 'blue',
                        font: {
                            size: 30
                        },
                        formatter: (value, context) => {
                            return value;
                        }
                    },
                    legend: {
                        position: 'top',
                        display: true
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                let label = context.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.raw !== null) {
                                    label += context.raw.toLocaleString();
                                }
                                return label;
                            }
                        }
                    }
                }
            }
        };

        // Renderizando o primeiro gráfico
        const ctx1 = document.getElementById('myPieChart1').getContext('2d');
        const myPieChart1 = new Chart(ctx1, config1);

        // Dados do segundo gráfico de pizza
        const data2 = {
            labels: ['Cadastrados: ${countVisitas.visitasCadastradas(visitas)[0]} ', 'Não Cadastrados: ${countVisitas.visitasCadastradas(visitas)[1]}'],
            datasets: [{
                label: 'Valores',
                data: [${countVisitas.visitasCadastradas(visitas)}],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
            }]
        };

        // Configuração do segundo gráfico
        const config2 = {
            type: 'pie',
            data: data2,
            options: {
                responsive: true,
                animation: false,
                plugins: {
                    datalabels: {
                        color: 'green',
                        font: {
                            size: 30
                        },
                        formatter: (value, context) => {
                            return value;
                        }
                    },
                    legend: {
                        position: 'top',
                        display: true
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                let label = context.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.raw !== null) {
                                    label += context.raw.toLocaleString();
                                }
                                return label;
                            }
                        }
                    }
                }
            }
        };

        // Renderizando o segundo gráfico
        const ctx2 = document.getElementById('myPieChart2').getContext('2d');
        const myPieChart2 = new Chart(ctx2, config2);

    </script>`

    let BaseHtml = `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Lista-Usuarios</title>
        <style>
            * {
                padding: 0;
                margin: 0;
                font-family: Arial, Helvetica, sans-serif;
            }
    
            body {
                background-color: #FCFFFC;
                padding: 20px;
            }
    
            .cabecalho {
                margin-top: 3px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                color: #424643;
                position: relative;
            }
            img {
                width: 70%
            }
            h2 {
                margin-top: 15px;
                margin-bottom: 15px;
            }
    
            .data {
                position: absolute;
                top: 0;
                right: 0;
            }
    
            table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 10px;
            }
    
            .centralizado {
                font-size: 23px;
                text-align: center;
                margin-top: 25px;
            }
    
            /* Estilo para linhas pares */
            tr:nth-child(even) {
                background-color: #e6fff2;
            }
    
            /* Estilo para linhas ímpares */
            tr:nth-child(odd) {
                background-color: #e6ffe6;
            }
    
            th, td {
                padding: 10px;
                border: 1px solid #ddd;
                text-align: left;
            }
            #chartContainer{
                height: 50%;
            }
        </style>
    </head>
    
    <body>
        <div class="cabecalho">
            <img src="http://localhost:3000/files/public/?uri=images/logo.png" alt="">
            <h2>Parque Natural Municipal do Juqueriquerê</h2>
        </div>
        <div>
            <p class="centralizado">Relatorio Total de Visitas</p>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Sexo</th>
                    <th>Nome</th>
                    <th>Data da Visita</th>
                    <th>email</th>
                    <th>cidade</th>
                </tr>
            </thead>
            <tbody>

                ${linhas.join('')} 

            </tbody>
            
        </table>

        ${Graficos}
    </body>
    
    </html>`;
    console.log(countVisitas.visitasTiposSexo(visitas));
    console.log(`teste: ${countVisitas.visitasTiposSexo(visitas)}`);
    return BaseHtml;
}
export default generateHTML;