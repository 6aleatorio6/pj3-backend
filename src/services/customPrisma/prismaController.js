import { Prisma } from '@prisma/client';
import { HttpException } from '../secureController/handlersPaia.js';
import { errosSabidos } from './msgsDeErro.js';
import {
  PrismaClientInitializationError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';

export const PrismaErrorInterceptor = Prisma.defineExtension((dbClient) =>
  dbClient.$extends({
    query: {
      async $allOperations({ args, operation, model, query }) {
        try {
          return await query(args);
        } catch (e) {
          if (e instanceof HttpException) throw e;

          if (e?.code) errosSabidos(e, model); // se for um erro sabido dara erro

          // Log do erro para depuração
          console.error('Erro do Prisma:', e);

          // Tratamento específico para diferentes tipos de erros do Prisma
          const errorHandlers = {
            [PrismaClientInitializationError.name]: [
              500,
              'Erro de inicialização do Prisma. Verifique a conexão com o banco de dados.',
            ],
            [PrismaClientValidationError.name]: [
              400,
              'Erro de validação do Prisma. Verifique os dados enviados.',
              e.stack,
            ],
            [PrismaClientRustPanicError.name]: [
              500,
              'Erro interno do Prisma. Consulte os logs para mais detalhes.',
            ],
            [PrismaClientUnknownRequestError.name]: [
              500,
              'Erro desconhecido do Prisma. Consulte os logs para mais detalhes.',
            ],
          };

          // Executa o handler correspondente se o tipo de erro for reconhecido
          const handler = Object.keys(errorHandlers).find(
            (key) => key === e.name,
          );

          if (handler) {
            throw new HttpException(...errorHandlers[handler]);
          }

          // Se nenhum handler correspondente for encontrado, lança um erro genérico
          throw new HttpException(500, 'Erro desconhecido', e.message);
        }
      },
    },
  }),
);
