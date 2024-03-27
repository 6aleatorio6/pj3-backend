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
import routerAuth from './routers/auth.js';


import funcionarioRouter from './routers/funcionarioRouter.js'
import usuarioRouter from './routers/usuarioRouter.js'
import catalogoRouter from './routers/catalogoRouter.js'
const app = express();

const PORT = process.env.PORT || 3000;
const arrayDeOrigins = JSON.parse(process.env.CORS_ORIGINS || '["*"]');

// middleware
app.use(
  cors({ origin: arrayDeOrigins }),
  morgan('dev'),
  express.json(),
  express.urlencoded({ extended: false }),
  cookieParser(),
  passport.initialize(),
);

// controllers
app.use('/auth', routerAuth);
app.use('/funcionario', funcionarioRouter);
app.use('/usuario', usuarioRouter);
app.use('/catalogo', catalogoRouter);


app.listen(PORT, () => {
  console.log(`Porta: ${PORT} | Cors: ${arrayDeOrigins}`);
});


export default app