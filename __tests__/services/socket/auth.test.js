/* eslint-disable n/no-callback-literal */
/* eslint-disable no-unused-vars */
import Client, { Socket as SocketC } from 'socket.io-client';
import serverApp, { io } from '../../../src/app.js';
import { jwtSign } from '../../../src/services/auth/helpersAuth.js';

describe('auth Socket', () => {
  /** * @type  {SocketC} */
  let clientSocket;

  afterEach((d) => {
    serverApp.close();
    clientSocket.disconnect();
    d();
  });

  it('token correto', (done) => {
    serverApp.listen(() => {
      const port = serverApp.address().port;
      clientSocket = new Client(`http://localhost:${port}`, {
        auth: { token: jwtSign({ id: 2, roles: 'TOTEM' }) },
      });

      clientSocket.on('connect_error', done);
      clientSocket.on('connect', done);
    });
  });

  it('token faltante', (done) => {
    serverApp.listen(() => {
      const port = serverApp.address().port;
      clientSocket = new Client(`http://localhost:${port}`, {});

      clientSocket.on('connect', done);
      clientSocket.on('connect_error', (e) => {
        expect(e.message).toBe('token de sessão invalido');
        expect(e.data.status).toBe(401);
        done();
      });
    });
  });

  it('token sem permissao', (done) => {
    serverApp.listen(() => {
      const port = serverApp.address().port;
      clientSocket = new Client(`http://localhost:${port}`, {
        auth: { token: jwtSign({ id: 2, roles: 'paia' }) },
      });

      clientSocket.on('connect', done);
      clientSocket.on('connect_error', (e) => {
        expect(e.message).toBe('Você não tem permissão');
        expect(e.data.status).toBe(403);
        done();
      });
    });
  });
});
