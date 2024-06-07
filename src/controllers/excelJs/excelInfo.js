import generateExcel from "../../services/excelGenerate/excelGenerator.js";
import fs from 'fs';

const todosUsuariosPDFTeste = async (req, res) => {
  try {
    let mockDados = [
      {
        cidade: "São Paulo",
        sexo: "Masculino",
        nome: "João Silva",
        email: "joao.silva@example.com"
      },
      {
        cidade: "Rio de Janeiro",
        sexo: "Feminino",
        nome: "Maria Oliveira",
        nascimento: "1985-05-30",
      },
      {
        cidade: "Belo Horizonte",
        sexo: "Masculino",
        nome: "Pedro Costa",
        nascimento: "1992-09-20",
      },
      {
        cidade: "Curitiba",
        sexo: "Feminino",
        nome: "Ana Pereira",
        nascimento: "1988-12-10",
        email: "ana.pereira@example.com"
      },
      {
        cidade: "Porto Alegre",
        sexo: "Masculino",
        nome: "Carlos Souza",
        nascimento: "1995-03-25",
        email: "carlos.souza@example.com"
      }
    ];
    //  no navegador:    http://localhost:3000/excel/listar-usuarios
    const Excelgerate = await generateExcel(mockDados)

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

export default todosUsuariosPDFTeste