import prisma from '../../src/prisma.js';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { prismaExtensionSoftDelete } from '../../src/services/customPrisma/softDelete.js';

/**
 * @type {typeof prisma}
 */
const prismaSoftDelete = prisma.$extends(prismaExtensionSoftDelete);

describe('prisma extends softDelete', () => {
  let id;

  it('criando um usuario um usuario', async () => {
    const user = await prismaSoftDelete.usuario.create({
      select: { id: true, apelido: true, deleted_at: true },
      data: { apelido: 'paia' },
    });

    id = user.id;
    expect(user).toEqual({ id, apelido: 'paia', deleted_at: null });
  });

  it('atualizar usuario', async () => {
    const user = await prismaSoftDelete.usuario.update({
      select: { id: true, apelido: true, deleted_at: true },
      where: {
        id,
      },
      data: {
        apelido: 'paioso',
      },
    });

    expect(user).toEqual({
      id,
      apelido: 'paioso',
      deleted_at: null,
    });
  });

  it('deletar usuario com softdelete', async () => {
    await prismaSoftDelete.usuario.delete({
      where: {
        id,
      },
    });

    const user = await prismaSoftDelete.usuario.findFirst({
      where: {
        id,
      },
    });

    expect(user).toBe(null);
  });

  it('tentar apagar 2 vezes', async () => {
    try {
      await prismaSoftDelete.usuario.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        expect(error.code).toBe('P2025');
      }
    }
  });

  it('criando um usuario um usuario e uma visita junto', async () => {
    const user = await prismaSoftDelete.usuario.create({
      select: { id: true, apelido: true, deleted_at: true },
      data: {
        apelido: 'paia',
        visitas: { create: { dataDaVisita: new Date() } },
      },
    });

    id = user.id;
    expect(user).toEqual({ id, apelido: 'paia', deleted_at: null });
  });

  it('deletando a  visita ', async () => {
    await prismaSoftDelete.visitas.delete({
      where: {
        usuario_id: id,
      },
    });

    const visita = await prismaSoftDelete.visitas.findFirst({
      where: {
        usuario_id: id,
      },
    });

    expect(visita).toBe(null);
  });

  it('tentando uma consulta de um usuario e as visitas com select', async () => {
    const user = await prismaSoftDelete.usuario.findFirst({
      where: {
        id,
      },
      select: {
        visitas: true,
      },
    });

    expect(user.visitas).toBe(null);
  });

  it('tentando uma consulta de um usuario e as visitas com include', async () => {
    const user = await prismaSoftDelete.usuario.findFirst({
      where: {
        id,
      },
      include: {
        visitas: true,
      },
    });

    const user2 = await prismaSoftDelete.usuario.findFirst({
      where: {
        id,
      },
      select: { visitas: { include: { usuario: true } } },
    });

    expect(user.visitas).toBe(null);
    expect(user2.visitas).toBe(null);
  });

  it('verificando se a visita ainda existe no banco', async () => {
    const user = await prisma.usuario.findFirst({
      where: {
        id,
      },
      select: {
        visitas: true,
      },
    });

    expect(user.visitas).toHaveProperty('deleted_at');
  });
});
