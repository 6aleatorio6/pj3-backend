import { Router } from 'express';
import login from '../controllers/auth/login.js';
import {
  loginFuncionario,
  loginUsuario,
} from '../services/auth/local-strategy.js';
import { loginGoogle } from '../services/auth/google-strategy.js';
import { loginFacebook } from '../services/auth/facebook-strategy.js';

const routerAuth = Router();

routerAuth.post('/login/user', loginUsuario, login);
routerAuth.post('/login/funcionario', loginFuncionario, login);

routerAuth.post('/login/google', loginGoogle, login);
routerAuth.post('/login/facebook', loginFacebook, login);

export default routerAuth;
