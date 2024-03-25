import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const totalUsuarios = async ({sexo, cidade, foto, numeroUsuarios = 0, puleUsuarios = 0}) => {

    const filtro = {}
    if (sexo !== undefined) filtro.sexo = sexo;
    if (cidade !== undefined) filtro.cidade = cidade;
    if (foto !== undefined) filtro.foto = foto;

    const countUsers = await prisma.usuario.count({
        where: filtro,
        skip: puleUsuarios,
        take: numeroUsuarios
    })
    const users = await prisma.usuario.findMany()
    return {countUsers, users}
}

const totalFuncionarios = async () => {
    const countUsers = await prisma.usuario.count()
    const users = await prisma.usuario.findMany()
    return {countUsers, users}
}

const totalVisitas = async () => {
    const countUsers = await prisma.usuario.count()
    const users = await prisma.usuario.findMany()
    return {countUsers, users}
}

export default {totalFuncionarios, totalUsuarios, totalVisitas}