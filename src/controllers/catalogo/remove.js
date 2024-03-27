import prisma from "../../prisma.js";

const remove = async (req, res) => {
    try {
        const { id } = req.params
        const catalogo = await prisma.catalogo.delete({
            where: {
                id: +id
            }
        })
        res.json({ success: `Catalogo ${id} removido com sucesso`, catalogo })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Houve um erro no nosso servidor, tente novamente!' })
    }

}

export default remove