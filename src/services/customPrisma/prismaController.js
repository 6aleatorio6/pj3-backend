/* eslint-disable camelcase */
// eslint-disable-next-line no-unused-vars
import { Prisma } from '@prisma/client';
import { HttpException } from '../secureController/handlersPaia.js';
import prisma from '../../prisma.js';
import { prismaSoftDelete } from './softDelete.js';
import { errosSabidos } from './msgsDeErro.js';

/**
 * @description cliente prisma estendido para ser usado dentro do `endpointBoxSafe`
 *
 *
 *
 * @template  M
 * @template  F
 * @template  O
 *
 * criando uma tipagem que inclua o simularUnique
 * @type {  {
 *   [M in keyof Prisma.TypeMap['model'] ]: {
 *     [O in keyof Prisma.TypeMap['model'][M]['operations']]:
 *        function(Prisma.TypeMap['model'][M]['operations'][O]['args'] & {
 *            simularUnique: (keyof Prisma.TypeMap['model'][M]['fields'])[]
 *        }): Promise<Prisma.TypeMap['model'][M]['operations'][O]['result']>
 *   }
 * }}
 */
export const prismaPaiado = prisma.$extends({
  query: {
    async $allOperations({ args, operation, model }) {
      try {
        const { simularUnique = [], ...argsNormal } = args;

        for (const coluna of simularUnique) {
          await UniqueArtificial(model, coluna, args.data[coluna]);
        }

        return await prismaSoftDelete[model][operation](argsNormal);
      } catch (e) {
        const errosTrataveis = [
          [Prisma.PrismaClientKnownRequestError, errosSabidos(e, model)],
          [
            Prisma.PrismaClientInitializationError,
            [500, 'Erro ao se comunicar com o banco de dados'],
          ],
          [
            Prisma.PrismaClientValidationError,
            [
              500,
              'Chamada do Prisma inválida. Verifique a sua consulta do prisma (se for dev)',
            ],
          ],
        ];

        const achandoErro = errosTrataveis.find(([er]) => e instanceof er);

        if (!achandoErro) {
          console.log(e);
          throw new HttpException(500, 'Erro desconhecido do Prisma');
        }

        throw new HttpException(...achandoErro[1]);
      }
    },
  },
});

async function UniqueArtificial(tabela, coluna, value) {
  if (!value) return;

  const isNotUnique = await prismaSoftDelete[tabela].findFirst({
    select: { [coluna]: true },
    where: { [coluna]: value },
  });

  if (isNotUnique)
    throw new Prisma.PrismaClientKnownRequestError(
      'esse código valeu o esforço?',
      {
        code: 'P2002',
        meta: {
          modelName: tabela,
          column_name: coluna,
        },
      },
    );
}
