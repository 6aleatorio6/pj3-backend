jest.mock('../../src/prisma');
import { loginUsuario } from '../../src/services/auth/local-strategy';
prisi
describe('local-strategy', () => {
  describe('user', () => {
    let user = jest.spyOn(prisma.usuario, 'findFirst');

    it('email e senha certos', () => {
      user.mockResolvedValue({ id: 3 });
    });
  });
});
