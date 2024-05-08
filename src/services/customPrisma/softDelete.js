import prisma from '../../prisma.js';

/**
 * @type {typeof prisma}
 * */
export const prismaSoftDelete = prisma.$extends({
  query: {
    $allModels({ query, model, operation, args }) {
      if (operation === 'delete' || operation === 'deleteMany') {
        return this[model][operation.replace('delete', 'update')]({
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

      deepChangeWhere(args, 'where', (e) => {
        e.deleted_at = null;
      }); 

      if (operation === 'findUnique' || operation === 'findUniqueOrThrow') {
        return this[model][operation.replace('Unique', 'First')](args);
      }

      return query(args);
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