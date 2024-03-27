// Importando os módulos necessários
import supertest from 'supertest';
import app from '../app'; // Suponha que 'app' seja o seu aplicativo Express

// Criando um mock para o PrismaClient
const prismaMock = {
  exemplo: {
    findMany: jest.fn().mockResolvedValue([{ id: 1, nome: 'Exemplo' }]),
  },
};

// Substituindo a implementação padrão do PrismaClient pelo mock
jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn(() => prismaMock),
}));

// Inicializando o supertest com o aplicativo Express
const request = supertest(app);

// Teste simples para verificar se a rota "/api/exemplo" retorna os dados esperados
test('Deve retornar os dados esperados ao fazer uma solicitação GET para /api/exemplo', async () => {
  const response = await request.get('/api/exemplo');
  expect(response.status).toBe(200);
  expect(response.body).toEqual([{ id: 1, nome: 'Exemplo' }]);
});
