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
import pdfRouter from './routers/pdfRouter.js'
import totenRouter from './routers/totenRouter.js'

const app = express();


const arrayDeOrigins = JSON.parse(process.env.CORS_ORIGINS || '["*"]');
// middleware
app.use(
  cors({ origin: JSON.parse(process.env.CORS_ORIGINS || '["*"]') }),
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
app.use('/geraPdf', pdfRouter)
app.use('/toten', totenRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Porta: ${PORT} | Cors: ${arrayDeOrigins}`);
});

export default app;
 