import { Prisma } from '@prisma/client';
import prisma from '../../prisma.js';

/**
 * @type {typeof prisma}
 */
export const prismaSoftDelete = prisma.$extends({
  query: {
    $allOperations({ query, model, operation, args }) {
      if (operation === 'delete' || operation === 'deleteMany') {
        return prisma[model][operation.replace('delete', 'update')]({
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

      deepChange(args, ['where', 'select', 'include'], (e, key) => {
        if (key === 'where') {
          e.deleted_at = null;
          return;
        }

        for (const keySelect in e) {
          if (!Object.keys(Prisma.ModelName).includes(keySelect)) return;
          const v = e[keySelect];
          const isObject = typeof v === 'object';

          e[keySelect] = {
            ...(isObject ? v : {}),
            where: { ...(isObject ? v.where : {}), deleted_at: null },
          };
        }
      });

      if (operation === 'findUnique' || operation === 'findUniqueOrThrow') {
        return prisma[model][operation.replace('Unique', 'First')](args);
      }

      return query(args);
    },
  },
});

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
