import prisma from "../../prisma.js";

const listAll = async (req, res) => {
    try {
        const catalogos = await prisma.catalogo.findMany()
        res.json({ success: `Catalogos listados com sucesso!`, catalogos })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Houve um erro no nosso servidor, tente novamente!' })
    }
}

export default listAll