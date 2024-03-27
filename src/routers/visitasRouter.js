import { Router } from 'express';
import listAll from '../controllers/visitas/listAll.js'
import getById from '../controllers/visitas/getById.js'
import create from '../controllers/visitas/create.js'
import update from '../controllers/visitas/update.js'
import remove from '../controllers/visitas/remove.js'

const router = Router();

router.get('/', listAll)
router.get('/:id', getById)
router.post('/', create)
router.put('/:id', update)
router.delete('/:id', remove)

export default router;
