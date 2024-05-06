import { hashSync } from 'bcrypt';

export function gerarHash(senha) {
  return hashSync(senha, 8);
}
