import { Router } from 'express';

import { loginFuncionario } from '../services/auth/local-strategy.js';
import login from '../controllers/auth/login.js';
import create from '../controllers/funcionario/create.js';
import listAll from '../controllers/funcionario/listAll.js';
import get from '../controllers/funcionario/get.js';
import update from '../controllers/funcionario/update.js';
import remove from '../controllers/funcionario/remove.js';
import { acessoApenasPara } from '../services/auth/jwt-strategy.js';

const router = Router();

router.post('/login', loginFuncionario, login);

router.post('/', acessoApenasPara('ADM'), create);
router.get('/', acessoApenasPara('ADM'), listAll);
router.get('/', acessoApenasPara('ADM', 'TOTEM'), get);
router.get('/:id', acessoApenasPara('ADM'), get);
router.put('/', acessoApenasPara('ADM', 'TOTEM'), update);
router.put('/:id', acessoApenasPara('ADM'), update);
router.delete('/', acessoApenasPara('ADM', 'TOTEM'), remove);
router.delete('/:id', acessoApenasPara('ADM'), remove);

export default router;
