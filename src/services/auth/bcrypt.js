import { hashSync } from 'bcrypt';

export function gerarHash(senha) {
  if (senha) return hashSync(senha, process.env.PASSWORD_SALTS || 8);
}
