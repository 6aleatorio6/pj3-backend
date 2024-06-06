import { Prisma } from '@prisma/client';

/**
 * @typedef {keyof Prisma.TypeMap['model']} Models
 *
 * @param { ({[M in Models]: keyof Prisma.TypeMap['model'][M]['fields']}[Models])[] } colsUniques
 */
export function UniquesPaiasPrisma(...colsUniques) {
  return Prisma.defineExtension((dbClient) =>
    dbClient.$extends({
      query: {
        async $allOperations({ query, model, operation, args }) {
          if (args.data && /(create)|(up)/g.test(operation)) {
            for (const fields of colsUniques) {
              await UniqueArtificial(
                model,
                fields,
                args.data[fields],
                dbClient,
              );
            }
          }

          return query(args);
        },
      },
    }),
  );
}

async function UniqueArtificial(tabela, coluna, value, dbClient) {
  if (!value) return;

  const isNotUnique = await dbClient[tabela].findFirst({
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
