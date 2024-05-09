import { Router } from 'express';
import listAll from '../controllers/catalogo/listAll.js';
import create from '../controllers/catalogo/create.js';
import update from '../controllers/catalogo/update.js';
import remove from '../controllers/catalogo/remove.js';
import { acessoApenasPara } from '../services/auth/jwt-strategy.js';
import getByUuid from '../controllers/catalogo/getByUuid.js';

const router = Router();

router.get('/', acessoApenasPara('ADM', 'USER'), listAll);
router.get('/:uuid', acessoApenasPara('ADM', 'USER'), getByUuid);
router.post('/', acessoApenasPara('ADM'), create);
router.put('/:uuid', acessoApenasPara('ADM'), update);
router.delete('/:uuid', acessoApenasPara('ADM'), remove);

export default router;
