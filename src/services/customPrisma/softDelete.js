/* eslint-disable no-unused-vars */
import { Prisma } from '@prisma/client';
import { createSoftDeleteExtension } from 'prisma-extension-soft-delete';

/**
 * SoftDelete usando pacote externo
 */
export const SoftDeletePrisma = createSoftDeleteExtension({
  models: Object.fromEntries(
    Object.values(Prisma.ModelName).map((m) => [m, true]), // ele monta um obj com as propriedades sendo as model com valor true
  ),
  defaultConfig: {
    field: 'deleted_at',
    createValue: (deleted) => {
      if (deleted) return new Date();
      return null;
    },
    allowToOneUpdates: true,
  },
});

/**
 * @deprecated MÉTODO SUBSTITUIDO POR UMA EXTENSAO EXTERNA
 */
const SoftDeletePrismaAntigo = Prisma.defineExtension((dbClient) =>
  dbClient.$extends({
    query: {
      $allOperations({ query, model, operation, args }) {
        if (operation === 'delete' || operation === 'deleteMany') {
          return dbClient[model][operation.replace('delete', 'update')]({
            ...args,
            where: {
              ...args.where,
              deleted_at: null,
            },
            data: {
              deleted_at: new Date(),
            },
          });
        }

        deepChange(args, ['where', 'select', 'include'], (objDoKey, key) => {
          if (key === 'where') {
            objDoKey.deleted_at = null;
            return;
          }

          //  só vai rodar essa parte se for select ou include
          //  o objDoKey pé os select que encontrar
          for (const keySelect in objDoKey) {
            if (!Object.keys(Prisma.ModelName).includes(keySelect)) continue; // verifico se tem uma proprieade com o nome de uma tabela do prisma
            const v = objDoKey[keySelect]; // pego essa propriedade
            const isObject = typeof v === 'object';

            objDoKey[keySelect] = {
              ...(isObject ? v : {}), // devolvo as prop se ele for um obj
              where: { ...(isObject ? v.where : {}), deleted_at: null }, // coloco um where
            };
          }
        });

        if (operation === 'findUnique' || operation === 'findUniqueOrThrow') {
          return dbClient[model][operation.replace('Unique', 'First')](args);
        }

        return query(args);
      },
    },
  }),
);

/**
 *
 * @param {object} arg
 * @param {Array} propsAlvos
 * @param {(prop: object, propName: string) => any} mudanca
 */
function deepChange(arg, propsAlvos, mudanca) {
  for (const key in arg) {
    const element = arg[key];

    if (propsAlvos.includes(key)) {
      mudanca(element, key);
      continue;
    }

    const isObject =
      element !== null &&
      typeof element === 'object' &&
      !Array.isArray(element);

    if (isObject) deepChange(element, propsAlvos, mudanca);
  }
}
