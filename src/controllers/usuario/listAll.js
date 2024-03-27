import prisma from "../../prisma.js";

const listAll = async (req, res) => {
    try {
        const usuarios = await prisma.usuario.findMany({
            where: {
                deleted_at: null
            }
        })
        res.json({ success: `Usuários listados com sucesso!`, usuarios })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Houve um erro no nosso servidor, tente novamente!' })
    }
}

export default listAll