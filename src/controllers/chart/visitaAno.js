import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default async (req, res) => {
    const year = new Date().getFullYear();
    try {
        const visitas = await prisma.$queryRaw`
            SELECT
                DATE_FORMAT(dataDaVisita, '%Y-%m') AS monthYear,
                COUNT(*) as count
            FROM
                Visitas
            WHERE
                YEAR(dataDaVisita) = ${year}
            GROUP BY
                monthYear
          `
        const result = visitas.map(visit => ({
            ...visit,
            count: Number(visit.count)
        }))
        res.json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Houve um erro no nosso servidor, tente novamente!' })
    }
}