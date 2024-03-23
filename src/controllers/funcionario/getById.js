import funcionarioModel from "../../models/funcionarioModel.js"

const getById = async (req, res) => {
    try {
        const { id } = req.params
        const funcionario = await funcionarioModel.getById(+id)
        res.json({ success: `Funcionário ${id} encontrado com sucesso`, funcionario })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Houve um erro no nosso servidor, tente novamente!' })
    }

}

export default getById