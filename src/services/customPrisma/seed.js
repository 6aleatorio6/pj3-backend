import prisma from '../../prisma.js';
import { gerarHash } from '../auth/helpersAuth.js';

prisma.funcionario.create({
  data: {
    nome: 'paia vegetal',
    roles: 'ADM',
    email: 'paiaTriste@gmail.com',
    cpf: 'vcsSãoTristes',
    senha: gerarHash('paiosinha'),
  },
});
