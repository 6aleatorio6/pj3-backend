/* eslint-disable camelcase */

/**
 *
 * @param {import('@prisma/client/runtime/library').PrismaClientKnownRequestError} e
 */
export const errosSabidos = (e, modelOrignal) => {
  const { modelName: modelError, target, column_name } = e.meta || {};

  const model = modelError || modelOrignal;

  const col = column_name || target?.split('_')[1] || model;

  const errosPeloCod = {
    P2000: [400, `Valor muito longo para o campo ${col}.`],
    P2001: [404, `${model} não encontrado.`],
    P2002: [400, `esse ${col} já está sendo usado.`],
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
    P2025: [400, `${model} não encontrado.`],
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

  return errosPeloCod[e.code] || [400, e.message];
};
