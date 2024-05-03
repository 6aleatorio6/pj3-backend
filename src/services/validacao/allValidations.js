import { z } from 'zod';

export const allValid = z.object({
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
