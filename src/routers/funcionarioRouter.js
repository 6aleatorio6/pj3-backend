import { Router } from 'express';

import login from '../controllers/auth/login.js';
import create from '../controllers/funcionario/create.js';
import listAll from '../controllers/funcionario/listAll.js';
import get from '../controllers/funcionario/get.js';
import update from '../controllers/funcionario/update.js';
import remove from '../controllers/funcionario/remove.js';
import { useGuard } from '../services/auth/guardJwt.js';
import middleLogin from '../services/auth/authLogin.js';

const router = Router();

router.post('/login', middleLogin('funcionario'), login);

router.post('/', useGuard('ADM'), create);
router.get('/', useGuard('ADM'), listAll);
router.get('/', useGuard('ADM', 'TOTEM'), get);
router.get('/:id', useGuard('ADM'), get);
router.put('/', useGuard('ADM', 'TOTEM'), update);
router.put('/:id', useGuard('ADM'), update);
router.delete('/', useGuard('ADM', 'TOTEM'), remove);
router.delete('/:id', useGuard('ADM'), remove);

export default router;
