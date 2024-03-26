import funcionarioModel from "../../models/funcionarioModel.js"

const remove = async (req, res) => {
    try {
        const { id } = req.params
        const date = new Date().toLocaleString
        const funcionario = await funcionarioModel.remove(+id, date)
        res.json({ success: `Funcionário ${id} removido com sucesso`, funcionario })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Houve um erro no nosso servidor, tente novamente!' })
    }

}

export default remove