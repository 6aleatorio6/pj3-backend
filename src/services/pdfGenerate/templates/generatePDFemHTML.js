const generateHTML = (users) => {
    const BaseHtml = `<table border="1">
    <tr>
        <th colspan="5" class="centralizado">Primeira Linha</th>
        
        <tr>
        <td>Id</td>
        <td>Nome</td>
        <td>Telefone</td>
        <td>Usuario</td>
        <td>Data</td>
        </tr>
        ${cadaUser}
    
    </table>
    <style>
        /* Estilo para linhas pares */
        tr:nth-child(even) {
        background-color:rgb(250, 250, 229) ;
        }
        /* Estilo para linhas ímpares */
        tr:nth-child(odd) {
        background-color: rgb(242, 234, 234);
        }
    </style>`
    const cadaUser =``

    users.forEach(user => {
        cadaUser = `<tr><td>${user.id}<td>${user.Nome}<td>${user.Telefone}<td>${user.Data}`

        BaseHtml+= cadaUser
    });



    return BaseHtml 
}


export default generateHTML








