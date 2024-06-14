import { PrismaClient } from '@prisma/client';
import { UniquesPaiasPrisma } from './services/customPrisma/uniqueArtificial.js';
import { SoftDeletePrisma } from './services/customPrisma/softDelete.js';
import { PrismaErrorInterceptor } from './services/customPrisma/prismaController.js';

const PrismClass = class prisma extends PrismaClient {
  constructor() {
    super();
    this.$connect().catch(() => {
      console.error('PAIA: Não foi possivel se conectar com o banco\n');
    });
  }
};

const prisma = new PrismClass();

/**
 * prisma normal
 */
export default prisma;

/**
 * prisma com os tratamentos de erros do SecureController e a lógica de softdelete
 *
 * @type {typeof prisma}
 */
export const prismaPaiado = prisma
  .$extends(PrismaErrorInterceptor)
  .$extends(SoftDeletePrisma)
  .$extends(UniquesPaiasPrisma('email', 'googleId', 'facebookId'));

/**
 * Sem a logica do softDelete, mas com os tratamentos de erros do SecureController
 *
 * @type {typeof prisma}
 */
export const prismaApenasPaiado = prisma.$extends(PrismaErrorInterceptor);
