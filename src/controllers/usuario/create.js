import prisma from "../../prisma.js";

const create = async (req, res) => {
    try {
        const data = req.body
        const usuario = await prisma.usuario.create({
            data
        });
        res.json({ success: `Usuário ${usuario.id} criado com sucesso!`, usuario })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Houve um erro no nosso servidor, tente novamente!' })
    }
}

export default create