import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default async (req, res) => {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    try {
        const visitasTotal = await prisma.$queryRaw`
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
        const total = visitasTotal.map(visit => ({
            ...visit,
            count: Number(visit.count)
        }))

        const visitasGenero = await prisma.$queryRaw`
            SELECT
                DAY(v.dataDaVisita) AS dia,
                sexo,
                COUNT(*) as count
            FROM
                Visitas v
            JOIN Usuario u ON v.usuario_Id = u.id
            WHERE
                YEAR(v.dataDaVisita) = ${year} AND MONTH(v.dataDaVisita) = ${month}
            GROUP BY
                dia, sexo
          `
        const genero = visitasGenero.map(visit => ({
            ...visit,
            count: Number(visit.count)
        }))

        const visitaMetodo = await prisma.visitas.findMany({
            select: {
                dataDaVisita: true,
                usuario: {
                    select: {
                        email: true,
                    }
                }
            },
            where: {
                dataDaVisita: {
                    gte: new Date(`${year}-${month}-01`),
                    lt: new Date(`${year}-${month}-31`)
                }
            }
        })
        const qrCode = visitaMetodo.filter(visitas => visitas.usuario.email !== null).length
        const toten = visitaMetodo.filter(visitas => visitas.usuario.email === null).length
        res.json({ total, genero, qrCode, toten })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Houve um erro no nosso servidor, tente novamente!' })
    }
}