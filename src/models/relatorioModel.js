import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const totalUsuarios = async ({sexo, cidade, email, foto, numeroUsuarios, puleUsuarios = 0}) => {

    const filtro = {
        sexo,
        cidade
    }

    const countUsers = await prisma.usuario.count({
        select: {
            foto: foto,
            email: email
        },
        where: filtro,
        skip: puleUsuarios,
        take: numeroUsuarios
    })
    const users = await prisma.usuario.findMany({
        select: {
            id: false,
            senhaHash: false
        },
        where: filtro,
        skip: puleUsuarios,
        take: numeroUsuarios
    })
    return {countUsers, users}
}

const totalFuncionarios = async ({sexo, cidade, email, foto, numerofuncionario, pulefuncionario = 0}) => {
    const filtro = {
        sexo,
        cidade
    }

    const countUsers = await prisma.funcionario.count({
        select: {
            foto: foto,
            email: email
        },
        where: filtro,
        skip: pulefuncionario,
        take: numerofuncionario
    })
    const users = await prisma.funcionario.findMany({
        select: {
            id: false,
            senhaHash: false
        },
        where: filtro,
        skip: pulefuncionario,
        take: numerofuncionario
    })
    return {countUsers, users}
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