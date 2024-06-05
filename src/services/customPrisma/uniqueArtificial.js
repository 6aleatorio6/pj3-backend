import { Prisma } from '@prisma/client';

/**
 *
 *
 * @param { (keyof Prisma.TypeMap['model'][key in keyof Prisma.TypeMap['model']]['fields'])[]} colsUniques
 */
export function prismaSoftDeleteExtension(colsUniques) {
  return Prisma.defineExtension((dbClient) =>
    dbClient.$extends({
      query: {
        async $allOperations({ query, model, operation, args }) {
          for (const coluna of colsUniques) {
            await UniqueArtificial(model, coluna, args.data[coluna]);
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
