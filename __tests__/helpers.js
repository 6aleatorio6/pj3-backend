import { prismaPaiado } from '../src/prisma.js';
import { jwtSign } from '../src/services/auth/helpersAuth.js';

/**
 *
 * @param {{id:number, token: string}} objUser - The object to store the generated token and user ID.
 */
export function UserNovoEach(objUser) {
  beforeEach(async () => {
    // Create a new user
    const user = await prismaPaiado.usuario.create({
      data: {
        apelido: 'leoleo',
        email: 'testeUserSemLido',
      },
    });

    objUser.token = jwtSign({ id: user.id, roles: 'USER' });
    objUser.id = user.id;
  });

  afterEach(async () => {
    await prismaPaiado.usuario.delete({ where: { id: objUser.id } });
  });
}
