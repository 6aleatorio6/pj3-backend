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
import getQrCode from '../controllers/usuario/getQrCode.js';

const router = Router();

// login
router.get('/login/google', loginGoogle, loginAuth);
router.get('/login/facebook', loginFacebook, loginAuth);
router.post('/login', loginUsuario, login);
router.post('/', create);

// rotas protegidas
router.get('/', acessoApenasPara('USER'), getByToken);
router.get('/rank', acessoApenasPara('USER'), getRankByToken);
router.get('/lerQrCode/:uuid', acessoApenasPara('USER'), getQrCode);
router.put('/', acessoApenasPara('USER'), update);
router.delete('/', acessoApenasPara('USER'), remove);

export default router;
