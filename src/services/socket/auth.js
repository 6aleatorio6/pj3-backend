import { jwtVerify } from '../auth/helpersAuth.js';

class ErrorSocket extends Error {
  constructor(message, status, details = {}) {
    super(message);
    this.name = 'ErrorSocket';
    this.data = { status, details };
  }
}

/**
 * @param {("USER" | "ADM" | "TOTEM")[]} roles
 */
export function useGuardSocket(...roles) {
  return (socket, next) => {
    try {
      const token = socket.handshake.auth.token;

      const result = jwtVerify(token);

      if (!result) {
        throw new ErrorSocket('token de sessão invalido', 401);
      }

      if (result === 'REFRESH') {
        throw new ErrorSocket('atualize o token de sessão', 302);
      }

      if (!roles.includes(result.roles)) {
        throw new ErrorSocket('Você não tem permissão', 403);
      }

      socket.user = {
        id: result.id,
        roles: result.roles,
      };
      next();
    } catch (error) {
      next(error);
    }
  };
}
