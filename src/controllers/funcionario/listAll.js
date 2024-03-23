import funcionarioModel from "../../models/funcionarioModel.js"

const listAll = async (req, res) => {
    try {
        const funcionarios = await funcionarioModel.getAll();
        res.json({ success: `Funcionários listados com sucesso!`, funcionarios })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Houve um erro no nosso servidor, tente novamente!' })
    }
}

export default listAll