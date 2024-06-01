import { Prisma } from '@prisma/client';
import { ErrorController } from '../../helpers/erroController.js';
import prisma from '../../prisma.js';
import { prismaSoftDelete } from './softDelete.js';

/**
 * @description cliente prisma estendido para ser usado dentro do `createController`
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
        if (e instanceof Prisma.PrismaClientKnownRequestError && e?.meta) {
          const esseErroSabido = errosSabidos[e.code];
          if (!esseErroSabido) throw new ErrorController();

          const sabedoriaSabia = esseErroSabido(e.meta.modelName);

          throw new ErrorController(sabedoriaSabia[0], sabedoriaSabia[1], e);
        }

        console.error(e);

        if (e instanceof Prisma.PrismaClientInitializationError)
          throw new ErrorController(
            500,
            'erro ao se comunicar com o banco de dados',
            e.name,
          );

        if (
          e instanceof Prisma.PrismaClientUnknownRequestError ||
          e instanceof Prisma.PrismaClientRustPanicError ||
          e instanceof Prisma.PrismaClientValidationError
        )
          throw new ErrorController(500, 'erro desconhecido do ORM'); // ou não tratado

        throw e;
      }
    },
  },
});

async function UniqueArtificial(tabela, coluna, value) {
  if (!value) return;

  const isNotUnique = await prismaSoftDelete[tabela].findFirst({
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
  P2000: (model) => [400, `Valor muito longo para este campo.`],
  P2001: (model) => [404, `${model} não encontrado.`],
  P2002: (model) => [400, `Email já existe.`],
  P2003: (model) => [400, `Chave estrangeira inválida.`],
  P2004: (model) => [400, `Restrição falhou no banco de dados.`],
  P2005: (model) => [400, `Valor inválido para este campo.`],
  P2006: (model) => [400, `Valor fornecido é inválido.`],
  P2007: (model) => [400, `Erro de validação de dados.`],
  P2008: (model) => [400, `Erro ao analisar a consulta.`],
  P2009: (model) => [400, `Erro ao validar a consulta.`],
  P2010: (model) => [400, `Consulta bruta falhou.`],
  P2011: (model) => [400, `Valor não pode ser nulo.`],
  P2012: (model) => [400, `Valor obrigatório está faltando.`],
  P2013: (model) => [400, `Argumento obrigatório está faltando.`],
  P2014: (model) => [400, `Ação viola uma relação necessária.`],
  P2015: (model) => [400, `${model} não encontrado.`],
  P2016: (model) => [400, `Erro na interpretação da consulta.`],
  P2017: (model) => [400, `${model}s não estão conectados.`],
  P2018: (model) => [400, `${model}s conectados estão faltando.`],
  P2019: (model) => [400, `Erro de entrada.`],
  P2020: (model) => [400, `Valor fora do intervalo.`],
  P2021: (model) => [404, `Tabela não encontrada.`],
  P2022: (model) => [404, `Coluna não encontrada.`],
  P2023: (model) => [400, `Dados inconsistentes na coluna.`],
  P2024: (model) => [503, `Tempo esgotado ao buscar uma nova conexão.`],
  P2025: (model) => [400, `o ${model} não existe.`],
  P2026: (model) => [400, `Recurso não suportado pelo banco de dados.`],
  P2027: (model) => [400, `Vários erros durante a execução da consulta.`],
  P2028: (model) => [400, `Erro na API de transação.`],
  P2029: (model) => [400, `Limite de parâmetros da consulta excedido.`],
  P2030: (model) => [400, `Índice de texto completo não encontrado.`],
  P2033: (model) => [400, `Número muito grande para este campo.`],
  P2034: (model) => [400, `Falha na transação devido a conflito ou impasse.`],
  P2035: (model) => [400, `Violação de asserção no banco de dados.`],
  P2036: (model) => [400, `Erro no conector externo.`],
  P2037: (model) => [400, `Muitas conexões de banco de dados abertas.`],
};
