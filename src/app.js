import 'dotenv/config.js';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import express from 'express';
import cors from 'cors';
import passport from 'passport';

import './services/auth/jwt-strategy.js';
import './services/auth/local-strategy.js';
import './services/auth/google-strategy.js';
import './services/auth/facebook-strategy.js';

import funcionarioRouter from './routers/funcionarioRouter.js';
import usuarioRouter from './routers/usuarioRouter.js';
import catalogoRouter from './routers/catalogoRouter.js';

const app = express();

export const corsOptions = JSON.parse(
  `{"origin": ${process.env.CORS_ORIGIN || '"*"'} }`,
);

// middleware
app.use(
  cors(corsOptions),
  morgan('dev'),
  express.json(),
  express.urlencoded({ extended: false }),
  cookieParser(),
  passport.initialize(),
);

// controllers
app.use('/funcionario', funcionarioRouter);
app.use('/usuario', usuarioRouter);
app.use('/catalogo', catalogoRouter);

export default app;
