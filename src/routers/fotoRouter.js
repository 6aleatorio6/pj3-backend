import { Router } from 'express';
import listAll from '../controllers/foto/listAll.js'
import getById from '../controllers/foto/getById.js'
import create from '../controllers/foto/create.js'
import update from '../controllers/foto/update.js'
import remove from '../controllers/foto/remove.js'

const router = Router();

router.get('/', listAll)
router.get('/:id', getById)
router.post('/', create)
router.put('/:id', update)
router.delete('/:id', remove)

export default router;
