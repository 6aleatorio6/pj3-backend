import { z } from 'zod';

const padrao = {
  oauthId: z.string().max(45),
  nome: z.string().min(3).max(45),
  url: z.string().min(1).max(200),
};

export const allValid = {
  id: z.coerce.number().int(),
  uuid: z.string().uuid(),

  // Modelo "usuario" e "funcionario"
  googleId: padrao.oauthId,
  facebookId: padrao.oauthId,
  email: z.string().email().max(80),
  foto: padrao.url,
  apelido: padrao.nome,
  nome: padrao.nome,
  cidade: padrao.nome,
  sexo: z.enum(['F', 'M', 'O']),
  cpf: z.string().min(11).max(14),
  senha: z.string().min(4).max(100),
  roles: z.enum(['ADM', 'TOTEM']),
  nascimento: z.coerce.date(),

  // Modelo "catalogo"
  descricao: z.string().min(10).max(800),
  nomePopular: padrao.nome,
  nomeCientifico: padrao.nome,
  especie: padrao.nome,
  som: padrao.url,
  medalha: padrao.url,
  ftModel: padrao.url,
  catalogoGaleria: z
    .array(padrao.url)
    .transform((ft) => ft.map((f) => ({ url: f })))
    .or(padrao.url.transform((ft) => ({ url: ft }))), // aproveito para transformar em um formato aceito pelo prisma

  // Modelo "visitas" e "lidoPeloUser"
  dataDaVisita: z.coerce.date(),
  dataDaDescoberta: z.coerce.date(),
  url: padrao.url,
};
