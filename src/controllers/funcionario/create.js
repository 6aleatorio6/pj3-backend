import prisma from "../../prisma.js";

const create = async (req, res) => {
    try {
        const data = req.body
        const funcionario = await prisma.funcionario.create({
            data
        });
        res.json({ success: `Funcionário ${funcionario.id} criado com sucesso!`, funcionario })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Houve um erro no nosso servidor, tente novamente!' })
    }
}

export default create