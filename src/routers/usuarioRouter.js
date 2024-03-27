import { Router } from 'express';
import listAll from '../controllers/usuario/listAll.js'
import getById from '../controllers/usuario/getById.js'
import create from '../controllers/usuario/create.js'
import update from '../controllers/usuario/update.js'
import remove from '../controllers/usuario/remove.js'

const router = Router();

router.get('/', listAll)
router.get('/:id', getById)
router.post('/', create)
router.put('/:id', update)
router.delete('/:id', remove)

export default router;
