/* eslint-disable n/no-callback-literal */
import serverApp, { io } from '../../../src/app.js';
import Client from 'socket.io-client';
import { jwtSign } from '../../../src/services/auth/helpersAuth.js';

describe('teste basico do SocketIo', () => {
  /** * @type  {SocketC} */
  let clientSocket;
  let serverSocket;

  beforeAll((done) => {
    serverApp.listen(3000, () => {
      const port = serverApp.address().port;
      clientSocket = new Client(`http://localhost:${port}`, {
        auth: { token: jwtSign({ id: 1, roles: 'TOTEM' }) },
      });

      io.on('connection', (socket) => {
        serverSocket = socket;
      });

      clientSocket.on('connect_error', (error) => {
        console.log(error);
        expect(error.code).toBe(401);
      });

      clientSocket.on('connect', done);
    });
  });

  afterAll(() => {
    serverApp.close();
    clientSocket.close();
  });

  test('should work', (done) => {
    clientSocket.on('hello', (arg) => {
      expect(arg).toBe('world');
      done();
    });
    serverSocket.emit('hello', 'world');
  });

  test('should work (with ack)', (done) => {
    serverSocket.on('hi', (cb) => {
      cb('hola');
    });
    clientSocket.emit('hi', (arg) => {
      expect(arg).toBe('hola');
      done();
    });
  });
});
