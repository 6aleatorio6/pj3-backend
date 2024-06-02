import { Router } from 'express';

import create from '../controllers/usuario/create.js';
import update from '../controllers/usuario/update.js';
import remove from '../controllers/usuario/remove.js';

import login from '../controllers/auth/login.js';
import getByToken from '../controllers/usuario/getByToken.js';
import getRankByToken from '../controllers/usuario/getRankByToken.js';

import getQrCode from '../controllers/usuario/getQrCode.js';
import { useGuard } from '../services/auth/guardJwt.js';
import middleLogin from '../services/auth/authLogin.js';
import oAuth from '../controllers/auth/oAuth.js';
import oauthCallback from '../controllers/auth/oauthCallback.js';
import verifyEmail from '../controllers/usuario/verify.js';

const router = Router();

// login
router.get('/login/:oauthName', oAuth);
router.get('/login/:oauthName/callback', oauthCallback);
router.post('/login', middleLogin('usuario'), login);
router.post('/', create);

router.get('/verify/?', verifyEmail);

// rotas protegidas
router.get('/', useGuard('USER'), getByToken);
router.get('/rank', useGuard('USER'), getRankByToken);
router.get('/lerQrCode/:uuid', useGuard('USER'), getQrCode);
router.put('/', useGuard('USER'), update);
router.delete('/', useGuard('USER'), remove);

export default router;
