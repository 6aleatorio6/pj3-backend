import { Prisma } from '@prisma/client';
import { ErrorController } from './erroController.js';
import prisma from '../prisma.js';

/**
 *
 * @template  T
 * @template  V
 *
 * @param {V} promisePrisma
 * @param {{simularUnique: {[T in keyof Prisma.TypeMap['model'] ]: [ keyof Prisma.TypeMap['model'][T]['fields'], any]} }} options
 * @returns {V}
 */
export async function paiarPrisma(promisePrisma, options = {}) {
  try {
    for (const tabela in options.simularUnique) {
      const [coluna, value] = options.simularUnique[tabela];

      await UniqueArtificial(tabela, coluna, value);
    }

    return await promisePrisma;
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      const esseErroSabido = errosSabidos[e.code];

      if (!esseErroSabido) throw new ErrorController();

      throw new ErrorController(esseErroSabido[0], esseErroSabido[1], e);
    }
    throw e;
  }
}

async function UniqueArtificial(tabela, coluna, value) {
  if (!value) return;

  const isNotUnique = await prisma[tabela].findFirst({
    select: {
      [coluna]: true,
    },
    where: {
      [coluna]: value,
    },
  });

  if (isNotUnique)
    throw new ErrorController(400, `esse ${coluna} já foi usado`);
}

const errosSabidos = {
  P2000: [400, 'Valor muito longo para este campo.'],
  P2001: [404, 'Registro não encontrado.'],
  P2002: [400, 'Email já existe.'],
  P2003: [400, 'Chave estrangeira inválida.'],
  P2004: [400, 'Restrição falhou no banco de dados.'],
  P2005: [400, 'Valor inválido para este campo.'],
  P2006: [400, 'Valor fornecido é inválido.'],
  P2007: [400, 'Erro de validação de dados.'],
  P2008: [400, 'Erro ao analisar a consulta.'],
  P2009: [400, 'Erro ao validar a consulta.'],
  P2010: [400, 'Consulta bruta falhou.'],
  P2011: [400, 'Valor não pode ser nulo.'],
  P2012: [400, 'Valor obrigatório está faltando.'],
  P2013: [400, 'Argumento obrigatório está faltando.'],
  P2014: [400, 'Ação viola uma relação necessária.'],
  P2015: [400, 'Registro relacionado não encontrado.'],
  P2016: [400, 'Erro na interpretação da consulta.'],
  P2017: [400, 'Registros não estão conectados.'],
  P2018: [400, 'Registros conectados estão faltando.'],
  P2019: [400, 'Erro de entrada.'],
  P2020: [400, 'Valor fora do intervalo.'],
  P2021: [404, 'Tabela não encontrada.'],
  P2022: [404, 'Coluna não encontrada.'],
  P2023: [400, 'Dados inconsistentes na coluna.'],
  P2024: [503, 'Tempo esgotado ao buscar uma nova conexão.'],
  P2025: [400, 'Operação falhou devido a registros faltantes.'],
  P2026: [400, 'Recurso não suportado pelo banco de dados.'],
  P2027: [400, 'Vários erros durante a execução da consulta.'],
  P2028: [400, 'Erro na API de transação.'],
  P2029: [400, 'Limite de parâmetros da consulta excedido.'],
  P2030: [400, 'Índice de texto completo não encontrado.'],
  P2033: [400, 'Número muito grande para este campo.'],
  P2034: [400, 'Falha na transação devido a conflito ou impasse.'],
  P2035: [400, 'Violação de asserção no banco de dados.'],
  P2036: [400, 'Erro no conector externo.'],
  P2037: [400, 'Muitas conexões de banco de dados abertas.'],
};
