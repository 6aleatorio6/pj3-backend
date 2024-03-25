import 'dotenv/config.js';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import express from 'express';
import cors from 'cors';
import passport from 'passport';
import './services/auth/jwt-strategy.js';
import './services/auth/local-strategy.js';
import routerAuth from './routers/auth.js';

const app = express();

const arrayDeOrigins = JSON.parse(process.env.CORS_ORIGINS);

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

export default app;
