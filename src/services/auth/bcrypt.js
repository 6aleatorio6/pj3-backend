import { hashSync } from 'bcrypt';

export function gerarHash(senha) {
  if (senha) return hashSync(senha, 8);
}
