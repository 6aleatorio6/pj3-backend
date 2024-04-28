import { Router } from 'express';
import listAll from '../controllers/usuario/listAll.js'
import getById from '../controllers/usuario/getById.js'
import create from '../controllers/usuario/create.js'
import update from '../controllers/usuario/update.js'
import remove from '../controllers/usuario/remove.js'
import { loginUsuario } from '../services/auth/local-strategy.js';
import login from '../controllers/auth/login.js';
import { loginGoogle } from '../services/auth/google-strategy.js';
import { loginFacebook } from '../services/auth/facebook-strategy.js';
import loginAuth from '../controllers/auth/loginAuth.js';

const router = Router();



router.get('/login/google', loginGoogle, loginAuth);
router.get('/login/facebook', loginFacebook, loginAuth);
router.post('/login', loginUsuario, login);

router.get('/', listAll)
router.get('/:id', getById)
router.post('/', create)
router.put('/:id', update)
router.delete('/:id', remove)

export default router;
