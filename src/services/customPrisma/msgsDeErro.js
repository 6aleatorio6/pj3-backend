/* eslint-disable camelcase */

import { HttpException } from '../secureController/handlersPaia.js';

/**
 *
 * @param {import('@prisma/client/runtime/library').PrismaClientKnownRequestError} e
 * @param {string} modelOriginal
 */
export const errosSabidos = (e, modelOriginal) => {
  const { code, message, meta } = e;

  const errosPeloCod = {
    P2000: [
      400,
      `O valor fornecido para o campo '${meta?.target}' é muito longo.`,
      meta,
    ],
    P2001: [404, `${meta?.target || modelOriginal} não encontrado.`, meta],
    P2002: [400, `O campo '${meta?.target}' já está em uso.`, meta],
    P2003: [400, `Chave estrangeira inválida: ${message}`, meta],
    P2004: [400, `Erro de restrição no banco de dados: ${message}`, meta],
    P2005: [400, `Valor inválido: ${message}`, meta],
    P2006: [400, `Valor inválido: ${message}`, meta],
    P2007: [400, `Erro de validação: ${message}`, meta],
    P2008: [400, `Erro na consulta: ${message}`, meta],
    P2009: [400, `Erro de validação na consulta: ${message}`, meta],
    P2010: [400, `Erro na execução da consulta: ${message}`, meta],
    P2011: [400, `Valor não pode ser nulo para '${meta?.target}'.`, meta],
    P2012: [400, `Falta um valor obrigatório para '${meta?.target}'.`, meta],
    P2013: [400, `Falta um argumento obrigatório: ${message}`, meta],
    P2014: [400, `Violação de integridade referencial: ${message}`, meta],
    P2015: [400, `${meta?.target || modelOriginal} não encontrado.`, meta],
    P2016: [400, `Erro na consulta: ${message}`, meta],
    P2017: [
      400,
      `Registros relacionados não encontrados para '${meta?.target || modelOriginal}'.`,
      meta,
    ],
    P2018: [
      400,
      `Falta conexão entre ${meta?.target || modelOriginal}(s) especificados.`,
      meta,
    ],
    P2019: [400, `Erro de entrada: ${message}`, meta],
    P2020: [
      400,
      `Valor fora do intervalo permitido para '${meta?.target}'.`,
      meta,
    ],
    P2021: [404, `Tabela não encontrada.`, meta],
    P2022: [404, `Coluna não encontrada.`, meta],
    P2023: [
      400,
      `Dados inconsistentes em '${meta?.target || modelOriginal}'.`,
      meta,
    ],
    P2024: [503, `Tempo esgotado para nova conexão.`, meta],
    P2025: [400, `${meta?.target || modelOriginal} não encontrado.`, meta],
    P2026: [400, `Recurso não suportado: ${message}`, meta],
    P2027: [400, `Vários erros na consulta: ${message}`, meta],
    P2028: [400, `Erro na transação: ${message}`, meta],
    P2029: [400, `Limite de parâmetros excedido: ${message}`, meta],
    P2030: [400, `Índice não encontrado: ${message}`, meta],
    P2033: [400, `Número muito grande: ${message}`, meta],
    P2034: [400, `Falha na transação: ${message}`, meta],
    P2035: [400, `Violação de asserção: ${message}`, meta],
    P2036: [400, `Erro no conector: ${message}`, meta],
    P2037: [400, `Muitas conexões abertas: ${message}`, meta],
  };

  if (errosPeloCod[code]) throw new HttpException(...errosPeloCod[code]);
};
