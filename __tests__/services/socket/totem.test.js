/* eslint-disable n/no-callback-literal */
/* eslint-disable no-unused-vars */
import Client, { Socket as SocketC } from 'socket.io-client';
import serverApp from '../../../src/app.js';

describe('my awesome project', () => {
  /** * @type  {SocketC} */
  let clientSocket;

  beforeAll((done) => {
    serverApp.listen(() => {
      const port = serverApp.address().port;
      clientSocket = new Client(`http://localhost:${port}`);
      done();
    });
  });

  afterAll(() => {
    serverApp.close();
    clientSocket.close();
  });

  test('teste', (done) => {
    clientSocket.on('token', (arg) => {
      expect(arg).toBe('paia');
      done();
    });
  });
});
