import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import rotas from './index.js';
import { origin } from './helpers/corsOrigin.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { loggerMiddleware } from './helpers/loggerMidleware.js';
import { convertFilesToURLs } from './services/uploadFiles/upload.js';
import { baseUrl } from './helpers/getBaseUrl.js';
import { indexSocket } from './services/socket/index.js';

const app = express();

app.get('/', (req, res) => res.json({ message: 'servidor online!' }));

app.use(
  baseUrl.capturar,
  cors({ origin }),
  express.json(),
  express.urlencoded({ extended: false }),
  convertFilesToURLs, // mais pra frente tem que mover para dps da autenticacao
  loggerMiddleware,
  cookieParser(),
);

app.use(rotas);

const serverApp = createServer(app);

export const io = new Server(serverApp, { cors: { origin } });

io.on('connection', indexSocket);

export default serverApp;
