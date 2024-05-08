const generateHTML = (users) => {

    let linhas = [];
    users.forEach(user => {
        linhas.push(`<tr><td>${user.id}</td><td>${user.nome}</td><td>${user.telefone}</td><td>${user.data}</td></tr>`);
    });

    let BaseHtml = `<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Lista-Usuarios</title>
        <style>
            /* Estilo para linhas pares */
            tr:nth-child(even) {
            background-color: red;
            }
            /* Estilo para linhas ímpares */
            tr:nth-child(odd) {
            background-color: blue;
            }
            table{
                width: 100%
            }
        </style>
    </head>
    <body>
    <table>
        <tr>
            <th colspan="5" class="centralizado">Primeira Linha</th>
            
            <tr>
            <td>Id</td>
            <td>Nome</td>
            <td>Telefone</td>
            <td>Usuario</td>
            <td>Data</td>
            </tr>
    
            ${linhas.join('')}
        
        </table>
    </body>
    </html>`

    return BaseHtml
}


export default generateHTML






