const formatarData = (nascimento) => {
    const data = new Date(nascimento);
    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const ano = data.getFullYear().toString();
    const dataFormatada = `${dia}/${mes}/${ano}`;

    return dataFormatada
}

const generateHTML = (visitas) => {

    let linhas = [];
    visitas.forEach(visita => {
        linhas.push(`<tr><td>${visita.usuario.sexo}</td><td>${visita.usuario.nome}</td><td>${formatarData(visita.dataDaVisita)}</td><td>${visita.usuario.email ? visita.usuario.email : "não possui"}</td><td>${visita.usuario.cidade ? visita.usuario.cidade : "não informou"}</td></tr>`);
    });

    let Graficos = `
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <div style="width: 50%; margin: auto;">
        <canvas id="myPieChart"></canvas>
    </div>
    <script>
        // Dados do gráfico de pizza
        const data = {
            labels: ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Curitiba', 'Porto Alegre'],
            datasets: [{
                label: 'População',
                data: [12000000, 6700000, 2500000, 1900000, 1500000],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
            }]
        };

        // Configuração do gráfico
        const config = {
            type: 'pie',
            data: data,
            options: {
                responsive: true,
                animation: false,
                plugins: {
                    legend: {
                        position: 'top',
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
            },
        };

        // Renderizando o gráfico
        const ctx = document.getElementById('myPieChart').getContext('2d');
        const myPieChart = new Chart(ctx, config);
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
        </style>
    </head>
    
    <body>
        <div class="cabecalho">
            <img src="https://picsum.photos/200/100" alt="">
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

                ${Graficos}
            </tbody>
            
        </table>
    </body>
    
    </html>`;

    return BaseHtml;
}

export default generateHTML;