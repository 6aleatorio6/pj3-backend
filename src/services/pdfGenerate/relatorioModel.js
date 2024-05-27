import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const totalUsuarios = async ({ sexo, cidade, email, foto, numeroUsuarios, puleUsuarios = 0 }) => {

    const filtro = {
        ...(sexo && { sexo }),
        ...(cidade && { cidade }),
        ...(email && { email: { not: null } }),
        ...(foto && { foto: { not: null } })
    }
    const users = await prisma.usuario.findMany({
        select: {
            id: false,
            senhaHash: false,
            visitas: true,
        },
        where: filtro,
        skip: puleUsuarios,
        take: numeroUsuarios
    })

    const countUsers = users.length
    return { countUsers, users }
}

const totalFuncionarios = async ({ adm, numerofuncionario, pulefuncionario = 0 }) => {
    const filtro = {
        adm
    }

    const funcionarios = await prisma.funcionario.findMany({
        select: {
            id: false,
            senhaHash: false
        },
        where: filtro,
        skip: pulefuncionario,
        take: numerofuncionario
    })

    const countFuncionarios = funcionarios.length

    return { countFuncionarios, funcionarios }
}

const totalVisitas = async ({ sexo, cidade, email, foto, dataDaVisitaMin, dataDaVisitaMax, numeroVisitas, puleVisitas = 0 }) => {
    const filtro = {
        ...(sexo && { sexo }),
        ...(cidade && { cidade }),
        ...(email && { email: { not: null } }),
        ...(foto && { foto: { not: null } })
    }


    const visitas = await prisma.visitas.findMany({
        select: {
            usuario: {
                select: {
                    senhaHash: false,
                    id: false
                }
            }
        },
        where: {
            usuario: filtro,
            dataDaVisita: {
                gte: dataDaVisitaMin,
                lte: dataDaVisitaMax
            }
        },
        skip: puleVisitas,
        take: numeroVisitas
    })
    const countVisitas = visitas.length 
    return { visitas, countVisitas }
}

export default {totalVisitas, totalFuncionarios, totalUsuarios}