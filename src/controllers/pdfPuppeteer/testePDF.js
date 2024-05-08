import generatePDF from "../../services/pdfGenerate/pdfGenerator.js";
import generateHTML from "../../services/pdfGenerate/templates/generatePDFemHTML.js";

const todosUsuariosPDFTeste = async (req, res) => {
    try {
        let mockDados = [
            {
              id: 1,
              data: "1990-01-01",
              telefone: "(00) 0000-0000",
              nome: "Fulano"
            },
            {
              id: 2,
              data: "1995-02-15",
              telefone: "(11) 1111-1111",
              nome: "Ciclano"
            },
            {
              id: 3,
              data: "1985-05-20",
              telefone: "(22) 2222-2222",
              nome: "Beltrano"
            },
            {
              id: 4,
              data: "1988-10-10",
              telefone: "(33) 3333-3333",
              nome: "Deltrano"
            },
            {
              id: 5,
              data: "1978-12-25",
              telefone: "(44) 4444-4444",
              nome: "Estrano"
            }
          ];
        //  no navegador:    http://localhost:3000/gerapdf/listar-usuarios
        const htmlContent = generateHTML(mockDados) // Usando o generateHTML para gerar o HTML ao invez do compileTemplate
        console.log(htmlContent);
        const pdf = await generatePDF(htmlContent)
        res.contentType('application/pdf')
        
        res.send(pdf)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Houve um erro no nosso servidor, tente novamente!' })
    }
}

export default todosUsuariosPDFTeste