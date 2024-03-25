import { Router } from 'express';
import login from '../controllers/auth/login.js';
import { loginFuncionario, loginUsuario } from '../services/auth/local-strategy.js';

const routerAuth = Router();

routerAuth.post('/login/user', loginUsuario, login);
routerAuth.post('/login/adm', loginFuncionario, login);

export default routerAuth;
