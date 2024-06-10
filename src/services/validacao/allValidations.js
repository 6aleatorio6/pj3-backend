import { z } from 'zod';

export const allValid = {
  id: z.coerce.number().int(),
  uuid: z.string(),

  // Modelo "usuario" e "funcionario"
  googleId: z.string().max(45),
  facebookId: z.string().max(45),
  email: z.string().email().max(80),
  foto: z.string().max(200),
  apelido: z.string().max(45),
  nome: z.string().max(50),
  cidade: z.string().max(50),
  sexo: z.enum(['F', 'M', 'O']),
  cpf: z.string().max(14),
  senha: z.string().max(50),
  roles: z.enum(['ADM', 'TOTEM']),
  nascimento: z.coerce.date(),

  // Modelo "catalogo"
  descricao: z.string().max(800),
  nomePopular: z.string().max(45),
  nomeCientifico: z.string().max(45),
  som: z.string().max(45),
  medalha: z.string().max(200),
  ftModel: z.string().max(200),
  estrela: z.coerce.number().max(5),
  catalogoGaleria: z
    .array(z.string())
    .transform((ft) => ft.map((f) => ({ url: f })))
    .or(z.string().transform((ft) => ({ url: ft }))), // aproveito para transformar em um formato aceito ṕelo prisma

  // Modelo "foto"
  url: z.string().max(200),
  mostrarNoCarrosel: z.coerce.number().int().max(255),

  // Modelo "visitas" e "lidoPeloUser"
  dataDaVisita: z.string().max(45),
  dataDaDescoberta: z.string().max(45),
};
