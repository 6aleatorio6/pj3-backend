import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async (req, res) => {
    try {
        const visitasTotal = await prisma.$queryRaw`
            SELECT
                DATE_FORMAT(dataDaVisita, '%Y-%m') AS monthYear,
                COUNT(*) as count
            FROM
                Visitas
            GROUP BY
                monthYear
          `
        const total = visitasTotal.map(visit => ({
            ...visit,
            count: Number(visit.count)
        }))

        const visitasGenero = await prisma.$queryRaw`
            SELECT
                DATE_FORMAT(v.dataDaVisita, '%Y-%m') AS monthYear,
                sexo,
                COUNT(*) as count
            FROM
                Visitas v
            JOIN Usuario u ON v.usuario_Id = u.id
            GROUP BY
                monthYear, sexo
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
            }
        })
        const qrCode = visitaMetodo.filter(visitas => visitas.usuario.email !== null).length
        const toten = visitaMetodo.filter(visitas => visitas.usuario.email === null).length
        res.json({ total, genero, qrCode, toten})
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Houve um erro no nosso servidor, tente novamente!' })
    }
}