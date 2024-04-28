import { Router } from 'express';
import listAll from '../controllers/funcionario/listAll.js'
import getById from '../controllers/funcionario/getById.js'
import create from '../controllers/funcionario/create.js'
import update from '../controllers/funcionario/update.js'
import remove from '../controllers/funcionario/remove.js'
import { loginFuncionario } from '../services/auth/local-strategy.js';
import login from '../controllers/auth/login.js';

const router = Router();

router.post('/login', loginFuncionario, login);


router.get('/', listAll)
router.get('/:id', getById)
router.post('/', create)
router.put('/:id', update)
router.delete('/:id', remove)

export default router;
