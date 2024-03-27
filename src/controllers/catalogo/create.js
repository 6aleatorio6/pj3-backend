import prisma from "../../prisma.js";

const create = async (req, res) => {
    try {
        const data = req.body
        const catalogo = await prisma.catalogo.create({
            data
        });
        res.json({ success: `Catalogo ${catalogo.id} criado com sucesso!`, catalogo })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Houve um erro no nosso servidor, tente novamente!' })
    }
}

export default create