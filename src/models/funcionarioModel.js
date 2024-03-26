import prisma from "../prisma.js";

const getAll = async () => {
    return await prisma.funcionario.findMany({
        where: {
            deleted_at: null
        }
    });
}

const getById = async (id) => {
    return await prisma.funcionario.findUnique({
        where: {
            id,
            deleted_at: null
        }
    })
}

const create = async (funcionario) => {
    return await prisma.funcionario.create({
        data: funcionario
    })
}

const update = async (id, funcionario) => {
    return await prisma.funcionario.update({
        where: {
            id
        },
        data: funcionario
    })
}

const remove = async (id, date) => {
    return await prisma.funcionario.update({
        where: {
            id
        },
        data: {
            deleted_at: date
        }
    })
}

export default { getAll, getById, create, update, remove }