import { Router } from 'express';
import listAll from '../controllers/catalogo/listAll.js';
import create from '../controllers/catalogo/create.js';
import update from '../controllers/catalogo/update.js';
import remove from '../controllers/catalogo/remove.js';
import getByUuid from '../controllers/catalogo/getByUuid.js';
import { useGuard } from '../services/auth/guardJwt.js';

const router = Router();

router.get('/', useGuard('ADM', 'USER'), listAll);
router.get('/:uuid', useGuard('ADM', 'USER'), getByUuid);
router.post('/', useGuard('ADM'), create);
router.put('/:uuid', useGuard('ADM'), update);
router.delete('/:uuid', useGuard('ADM'), remove);

export default router;
