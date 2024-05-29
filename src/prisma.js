import { PrismaClient } from '@prisma/client';

export default new (class prisma extends PrismaClient {
  constructor() {
    super();
    this.$connect().catch(() => {
      console.error('PAIA: Não foi possivel se conectar com o banco\n');
    });
  }
})();
