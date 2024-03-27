import prisma from "../../prisma.js";

const listAll = async (req, res) => {
    try {
        const funcionarios = await prisma.funcionario.findMany({
            where: {
                deleted_at: null
            }
        })
        res.json({ success: `Funcionários listados com sucesso!`, funcionarios })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Houve um erro no nosso servidor, tente novamente!' })
    }
}

export default listAll