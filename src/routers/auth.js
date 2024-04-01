import { Router } from 'express';
import login from '../controllers/auth/login.js';
import {
  loginFuncionario,
  loginUsuario,
} from '../services/auth/local-strategy.js';
import { loginGoogle } from '../services/auth/google-strategy.js';
import { loginFacebook } from '../services/auth/facebook-strategy.js';
import loginAuth from '../controllers/auth/loginAuth.js';

const routerAuth = Router();

routerAuth.post('/login/user', loginUsuario, login);
routerAuth.post('/login/funcionario', loginFuncionario, login);

routerAuth.get('/login/google', loginGoogle, loginAuth);
routerAuth.get('/login/facebook', loginFacebook, loginAuth);

export default routerAuth;
