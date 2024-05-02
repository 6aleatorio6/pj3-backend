import { z } from 'zod';

export const validations = z.object({
  id: z.number().int(),
  uuid: z.string(),

  // Modelo "usuario" e "funcionario"
  googleId: z.string().max(45),
  facebookId: z.string().max(45),
  email: z.string().email().max(80),
  senhaHash: z.string().max(100),
  foto: z.string().max(45),
  apelido: z.string().max(45),
  nome: z.string().max(50),
  cidade: z.string().max(50),
  sexo: z.enum(['F', 'M', 'O']),
  cpf: z.string().max(14),

  // Modelo "catalogo"
  descricao: z.string().max(255),
  nomePopular: z.string().max(45),
  nomeCientifico: z.string().max(45),
  som: z.string().max(45),
  medalha: z.string().max(45),
  estrela: z.number().max(5),
  nascimento: z.string(),

  // Modelo "foto"
  url: z.string().max(45),
  mostrarNoCarrosel: z.number().int().max(255),

  // Modelo "visitas" e "lidoPeloUser"
  dataDaVisita: z.string().max(45),
  dataDaDescoberta: z.string().max(45),
});


export const validationsMessages = {
  id: 'ID deve ser um número inteiro.',
  uuid: 'UUID deve ser uma string.',

  googleId: 'Google ID deve ter no máximo 45 caracteres.',
  facebookId: 'Facebook ID deve ter no máximo 45 caracteres.',
  email: 'Email deve ser válido e ter no máximo 80 caracteres.',
  senhaHash: 'Senha deve ter no máximo 100 caracteres.',
  foto: 'URL da foto deve ter no máximo 45 caracteres.',
  apelido: 'Apelido deve ter no máximo 45 caracteres.',
  nome: 'Nome deve ter no máximo 50 caracteres.',
  cidade: 'Cidade deve ter no máximo 50 caracteres.',
  sexo: 'Sexo deve ser "F", "M" ou "O".',
  cpf: 'CPF deve ter no máximo 14 caracteres.',

  descricao: 'Descrição deve ter no máximo 255 caracteres.',
  nomePopular: 'Nome popular deve ter no máximo 45 caracteres.',
  nomeCientifico: 'Nome científico deve ter no máximo 45 caracteres.',
  som: 'Som deve ter no máximo 45 caracteres.',
  medalha: 'Medalha deve ter no máximo 45 caracteres.',
  estrela: 'Estrela deve ser um número máximo de 5.',
  nascimento: 'Nascimento deve ser uma data válida.',

  url: 'URL deve ter no máximo 45 caracteres.',
  mostrarNoCarrosel: 'Mostrar no carrossel deve ser um número máximo de 255.',
  dataDaVisita:
    'Data da visita deve ser uma data válida com no máximo 45 caracteres.',
  dataDaDescoberta:
    'Data da descoberta deve ser uma data válida com no máximo 45 caracteres.',
};
