import { Prisma } from '@prisma/client';
import { HttpException } from '../secureController/handlersPaia.js';
import { errosSabidos } from './msgsDeErro.js';

export const prismaControllerExtension = Prisma.defineExtension((dbClient) =>
  dbClient.$extends({
    query: {
      async $allOperations({ args, operation, model }) {
        try {
          return await dbClient[model][operation](args);
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
  }),
);
