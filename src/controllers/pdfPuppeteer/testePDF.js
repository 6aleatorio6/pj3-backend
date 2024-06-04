import generatePDF from "../../services/pdfGenerate/pdfGenerator.js";
import generateHTML from "../../services/pdfGenerate/templates/generatePDFemHTML.js";

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
        //  no navegador:    http://localhost:3000/gerapdf/listar-usuarios
        const htmlContent = generateHTML(mockDados) // Usando o generateHTML para gerar o HTML ao invez do compileTemplate
        const pdf = await generatePDF(htmlContent)
        res.contentType('application/pdf')
        
        res.send(pdf)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Houve um erro no nosso servidor, tente novamente!' })
    }
}

export default todosUsuariosPDFTeste