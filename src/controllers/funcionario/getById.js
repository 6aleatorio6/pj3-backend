import prisma from "../../prisma.js";

const getById = async (req, res) => {
    try {
        const { id } = req.params
        const funcionario = await prisma.funcionario.findUnique({
            where: {
                id: +id,
                deleted_at: null
            }
        })
        res.json({ success: `Funcionário ${id} encontrado com sucesso`, funcionario })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Houve um erro no nosso servidor, tente novamente!' })
    }

}

export default getById