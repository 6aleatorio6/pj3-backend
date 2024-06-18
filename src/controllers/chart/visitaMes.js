import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default async (req, res) => {
    const isPostgres = process.env.DB_TYPE === 'postgres';
    let total = null
    let genero = null
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    try {
        if (isPostgres) {
            const visitasTotal = await prisma.$queryRaw`
            SELECT
                TO_CHAR(dataDaVisita, 'YYYY-MM-DD') AS dia,
                COUNT(*) as count
            FROM
                Visitas
            WHERE
                EXTRACT(YEAR FROM dataDaVisita) = ${year} AND EXTRACT(MONTH FROM dataDaVisita) = ${month}
            GROUP BY
                dia
          `
            total = visitasTotal.map(visit => ({
                ...visit,
                count: Number(visit.count)
            }))

            const visitasGenero = await prisma.$queryRaw`
            SELECT
                TO_CHAR(v.dataDaVisita, 'YYYY-MM-DD') AS dia,
                sexo,
                COUNT(*) as count
            FROM
                Visitas v
            JOIN Usuario u ON v.usuario_Id = u.id
            WHERE
                EXTRACT(YEAR FROM v.dataDaVisita) = ${year} AND EXTRACT(MONTH FROM v.dataDaVisita) = ${month}
            GROUP BY
                dia, sexo
          `
            genero = visitasGenero.map(visit => ({
                ...visit,
                count: Number(visit.count)
            }))
        } else {
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
            total = visitasTotal.map(visit => ({
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
            genero = visitasGenero.map(visit => ({
                ...visit,
                count: Number(visit.count)
            }))
        }
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