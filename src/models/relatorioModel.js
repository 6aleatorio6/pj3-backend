import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const totalUsuarios = async ({sexo, cidade, email, foto, numeroUsuarios, puleUsuarios = 0}) => {

    const filtro = {
        ...(sexo && {sexo}),
        ...(cidade && {cidade}),
        ...(email && {email: {not: null}}),
        ...(foto && {foto: {not: null}})
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
    return {countUsers, users}
}

const totalFuncionarios = async ({adm, numerofuncionario, pulefuncionario = 0}) => {
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

    return {countFuncionarios, funcionarios}
}

const totalVisitas = async (numerovisitas, pulevisitas = 0) => {
    const filtro = {
        sexo,
        cidade
    }

    const countUsers = await prisma.visitas.count({
        select: {
            foto: foto,
            email: email
        },
        where: filtro,
        skip: pulevisitas,
        take: numerovisitas
    })
    const users = await prisma.visitas.findMany({
        select: {
            id: false,
            senhaHash: false
        },
        where: filtro,
        skip: pulevisitas,
        take: numerovisitas
    })
    return {countUsers, users}
}

export default {totalFuncionarios, totalUsuarios, totalVisitas}