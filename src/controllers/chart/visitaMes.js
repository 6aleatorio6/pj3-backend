import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default async (req, res) => {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    try {
        const visitas = await prisma.$queryRaw`
            SELECT
            DAY(dataDaVisita) AS dia,
            COUNT(*) AS count
            FROM
                Visitas
            WHERE
                YEAR(dataDaVisita) = ${year} AND MONTH(dataDaVisita) = ${month}
            GROUP BY
                dia
          `
        const result = visitas.map(visit => ({
            ...visit,
            count: Number(visit.count)
        }))
        console.log(visitas)
        res.json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Houve um erro no nosso servidor, tente novamente!' })
    }
}