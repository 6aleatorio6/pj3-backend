import { Router } from 'express';

import create from '../controllers/usuario/create.js';
import update from '../controllers/usuario/update.js';
import remove from '../controllers/usuario/remove.js';
import { loginUsuario } from '../services/auth/local-strategy.js';
import login from '../controllers/auth/login.js';
import { loginGoogle } from '../services/auth/google-strategy.js';
import { loginFacebook } from '../services/auth/facebook-strategy.js';
import loginAuth from '../controllers/auth/loginAuth.js';
import getByToken from '../controllers/usuario/getByToken.js';
import getRankByToken from '../controllers/usuario/getRankByToken.js';
import { acessoApenasPara } from '../services/auth/jwt-strategy.js';

const router = Router();

// login
router.get('/login/google', loginGoogle, loginAuth);
router.get('/login/facebook', loginFacebook, loginAuth);
router.post('/login', loginUsuario, login);

// rotas protegidas
router.use(acessoApenasPara('USER'));
// rotas protegidas
router.get('/rank', getRankByToken);
router.get('/', getByToken);
router.post('/', create);
router.put('/', update);
router.delete('/', remove);

export default router;
