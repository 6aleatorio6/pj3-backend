import prisma from "../../prisma.js";

const remove = async (req, res) => {
    try {
        const { id } = req.params
        const date = new Date().toJSON()
        const usuario = await prisma.usuario.update({
            where: {
                id: +id
            },
            data: {
                deleted_at: date
            }
        })
        res.json({ success: `Funcionário ${id} removido com sucesso`, usuario })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Houve um erro no nosso servidor, tente novamente!' })
    }

}

export default remove