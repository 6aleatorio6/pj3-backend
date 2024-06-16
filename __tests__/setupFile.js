import { jest } from '@jest/globals';
import prisma from '../src/prisma.js';
import { execSync } from 'child_process';
import { gerarHash } from '../src/services/auth/helpersAuth.js';

process.env.DATABASE_URL = process.env.DATABASE_TESTE_URL;

global.jest = jest;

beforeAll(async () => {
  let dbValid = [
    prisma.usuario.findFirst({ where: { id: 1, apelido: 'leoleo' } }),
  ];

  dbValid = await Promise.all(dbValid);

  dbValid = dbValid.every((item) => item !== null);

  if (dbValid) return;

  execSync('npx prisma db push --force-reset && npm run seed');

  await prisma.usuario.create({
    select: { id: true },
    data: {
      id: 1,
      apelido: 'leoleo',
      email: 'paia@gmail.com',
      senha: gerarHash('1234'),
      lidoPeloUser: {
        create: {
          catalogo: {
            connect: { uuid: 'c9229a1e-1ad6-41dd-b27e-3b45707e6ed0' },
          },
        },
      },
    },
  });
});

afterAll(async () => await prisma.$disconnect());
