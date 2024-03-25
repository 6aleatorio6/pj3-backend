import { Router } from 'express';
import login from '../controllers/auth/login.js';
import { loginFuncionario, loginUsuario } from '../services/auth/local-strategy.js';
import { loginGoogle } from '../services/auth/google-strategy.js';

const routerAuth = Router();

routerAuth.post('/login/user', loginUsuario, login);
routerAuth.post('/login/adm', loginFuncionario, login);

routerAuth.post('/login/google', loginGoogle, login);

export default routerAuth;
