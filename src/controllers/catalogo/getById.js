import prisma from "../../prisma.js";

const getById = async (req, res) => {
    try {
        const { id } = req.params
        const catalogo = await prisma.catalogo.findUnique({
            where: {
                id: +id,
            }
        })
        res.json({ success: `Catalogo ${id} encontrado com sucesso`, catalogo })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Houve um erro no nosso servidor, tente novamente!' })
    }

}

export default getById