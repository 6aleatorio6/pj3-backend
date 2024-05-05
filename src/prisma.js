import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * @type {typeof prisma}
 * */
export default prisma.$extends({
  query: {
    $allModels: {
      $allOperations({ args, operation, query, model }) {
        if (operation === 'delete' || operation === 'deleteMany') {
          const op = operation === 'deleteMany' ? 'updateMany' : 'delete';

          return prisma[model][op]({
            ...args,
            data: {
              deleted_at: new Date(),
            },
          });
        }

        deepChangeWhere(args, 'where', (e) => {
          e.deleted_at = null;
        });
        return query(args);
      },
    },
  },
});

function deepChangeWhere(arg, propsAlvo, mudanca) {
  for (const key in arg) {
    const element = arg[key];

    if (key === propsAlvo) mudanca(element);

    const isObject =
      element !== null &&
      typeof element === 'object' &&
      !Array.isArray(element);

    if (isObject) deepChangeWhere(element);
  }
}
