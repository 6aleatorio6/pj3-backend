/* eslint-disable camelcase */
// eslint-disable-next-line no-unused-vars
import { Prisma } from '@prisma/client';
import { HttpException } from '../secureController/handlersPaia.js';
import prisma from '../../prisma.js';
import { prismaSoftDelete } from './softDelete.js';

/**
 * @description cliente prisma estendido para ser usado dentro do `endpointBoxSafe`
 *
 *
 *
 * @template  M
 * @template  F
 * @template  O
 *
 * criando uma tipagem que inclua o simularUnique
 * @type {  {
 *   [M in keyof Prisma.TypeMap['model'] ]: {
 *     [O in keyof Prisma.TypeMap['model'][M]['operations']]:
 *        function(Prisma.TypeMap['model'][M]['operations'][O]['args'] & {
 *            simularUnique: (keyof Prisma.TypeMap['model'][M]['fields'])[]
 *        }): Promise<Prisma.TypeMap['model'][M]['operations'][O]['result']>
 *   }
 * }}
 */
export const prismaPaiado = prisma.$extends({
  query: {
    async $allOperations({ args, operation, model }) {
      try {
        const { simularUnique = [], ...argsNormal } = args;

        for (const coluna of simularUnique) {
          await UniqueArtificial(model, coluna, args.data[coluna]);
        }

        return await prismaSoftDelete[model][operation](argsNormal);
      } catch (e) {
        switch (e.name) {
          case 'PrismaClientKnownRequestError':
            tratarErrosSabidos(e);
            break;

          case 'PrismaClientInitializationError':
            console.error(e);
            throw new HttpException(
              500,
              'Erro ao se comunicar com o banco de dados',
              e.name,
            );

          case 'PrismaClientValidationError':
            console.error(e);
            throw new HttpException(
              500,
              'Chamada do Prisma inválida. Verifique a sua consulta do prisma (se for dev)',
              e.message,
            );

          case 'PrismaClientUnknownRequestError':
          case 'PrismaClientRustPanicError':
            console.error(e);
            throw new HttpException(500, 'Erro desconhecido do Prisma');

          default:
            throw e; // Se o erro não for identificado, relança o erro original
        }
      }
    },
  },
});

async function UniqueArtificial(tabela, coluna, value) {
  if (!value) return;

  const isNotUnique = await prismaSoftDelete[tabela].findFirst({
    select: { [coluna]: true },
    where: { [coluna]: value },
  });

  if (isNotUnique) throw new HttpException(400, `esse ${coluna} já foi usado`);
}

function tratarErrosSabidos(e) {
  if (!e.meta) throw new HttpException(400, e.message);

  const sabedoriaSabia = errosSabidos(e.meta)[e.code];

  if (!sabedoriaSabia) throw new HttpException(400, e.message);

  throw new HttpException(sabedoriaSabia[0], sabedoriaSabia[1]);
}

const errosSabidos = (metaError) => {
  const { modelName: model, target, column_name } = metaError;

  const col = column_name || target?.split('_')[1] || model;

  return {
    P2000: [400, `valor muito longo para o campo ${col}.`],
    P2001: [404, `${model} não encontrado.`],
    P2002: [400, `${col} já existe.`],
    P2003: [400, `Chave estrangeira inválida.`],
    P2004: [400, `Erro de restrição no banco.`],
    P2005: [400, `Valor inválido.`],
    P2006: [400, `Valor inválido.`],
    P2007: [400, `Erro de validação.`],
    P2008: [400, `Erro na consulta.`],
    P2009: [400, `Erro de validação na consulta.`],
    P2010: [400, `Erro na consulta.`],
    P2011: [400, `Valor não pode ser nulo.`],
    P2012: [400, `Falta um valor obrigatório.`],
    P2013: [400, `Falta um argumento obrigatório.`],
    P2014: [400, `Relação necessária violada.`],
    P2015: [400, `${model} não encontrado.`],
    P2016: [400, `Erro na consulta.`],
    P2017: [400, `${model}s não conectados.`],
    P2018: [400, `Falta conexão entre ${model}s.`],
    P2019: [400, `Erro de entrada.`],
    P2020: [400, `Valor fora do intervalo.`],
    P2021: [404, `Tabela não encontrada.`],
    P2022: [404, `Coluna não encontrada.`],
    P2023: [400, `Dados inconsistentes em ${col}.`],
    P2024: [503, `Tempo esgotado para nova conexão.`],
    P2025: [400, `${model} não existe.`],
    P2026: [400, `Recurso não suportado.`],
    P2027: [400, `Vários erros na consulta.`],
    P2028: [400, `Erro na transação.`],
    P2029: [400, `Limite de parâmetros excedido.`],
    P2030: [400, `Índice não encontrado.`],
    P2033: [400, `Número muito grande.`],
    P2034: [400, `Falha na transação.`],
    P2035: [400, `Violação de asserção.`],
    P2036: [400, `Erro no conector.`],
    P2037: [400, `Muitas conexões abertas.`],
  };
};
