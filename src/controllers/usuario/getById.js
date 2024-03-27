import prisma from "../../prisma.js";

const getById = async (req, res) => {
    try {
        const { id } = req.params
        const usuario = await prisma.usuario.findUnique({
            where: {
                id: +id,
                deleted_at: null
            }
        })
        res.json({ success: `Usuário ${id} encontrado com sucesso`, usuario })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Houve um erro no nosso servidor, tente novamente!' })
    }

}

export default getById