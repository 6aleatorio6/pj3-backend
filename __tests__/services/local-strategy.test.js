import prisma from '../../src/prisma.js';
import bcrypt from 'bcrypt';
import app from '../../src/app.js';
import supertest from 'supertest';
import jwt from 'jsonwebtoken';

const request = supertest(app);

jest.spyOn(jwt, 'sign').mockImplementation((x) => x);

function reqUserPost(data, isNotUser) {
  const rota = !isNotUser ? 'usuario' : 'funcionario';
  return request.post(`/${rota}/login`).send(data);
}

const mockFindUser = jest.spyOn(prisma.usuario, 'findFirst');
const mockFindFuncio = jest.spyOn(prisma.funcionario, 'findFirst');
const userMock = {
  id: 1,
  email: 'usuario@example.com',
  senhaHash: bcrypt.hashSync('senhaCerta', 10),
};

describe('local-strategy', () => {
  afterEach(() => {
    mockFindUser.mockReset();
  });

  it('ceu azul | email e senha estao correto, conta USER', async () => {
    mockFindUser.mockResolvedValueOnce(userMock);
    const response = await reqUserPost({
      email: 'n importa',
      senha: 'senhaCerta',
    });

    const body = {
      message: 'sucesso no login',
      token: {
        id: 1,
        roles: 'USER',
      },
    };

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(body);
  });

  it('ceu azul | email e senha estao correto, conta Funcionario', async () => {
    mockFindFuncio.mockResolvedValueOnce({ ...userMock, roles: 'ADM' });
    const response = await reqUserPost(
      {
        email: 'n importa',
        senha: 'senhaCerta',
      },
      true,
    );

    const body = {
      message: 'sucesso no login',
      token: {
        id: 1,
        roles: 'ADM',
      },
    };

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(body);
  });

  it('céu triste | sem body ou body invalido', async () => {
    mockFindUser.mockResolvedValueOnce(userMock);
    const response = await reqUserPost({});

    expect(response.statusCode).toBe(400);
    expect(mockFindUser).toHaveBeenCalledTimes(0); // n chegou a usar o cb verify
  });

  it('céu triste | o email não existe', async () => {
    mockFindUser.mockResolvedValueOnce({}); // simulando que o prisma n encoutrou nd
    const response = await reqUserPost({ email: 'n importa', senha: '123' });

    expect(response.statusCode).toBe(401);
    expect(mockFindUser).toHaveBeenCalledTimes(1);
  });

  it('céu triste | email correto, mas senha errada', async () => {
    mockFindUser.mockResolvedValueOnce(userMock);
    const response = await reqUserPost({ email: 'n importa', senha: '123' });

    expect(response.statusCode).toBe(401);
  });
});
