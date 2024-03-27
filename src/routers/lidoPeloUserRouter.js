import { Router } from 'express';
import listAll from '../controllers/lidoPeloUser/listAll.js'
import getById from '../controllers/lidoPeloUser/getById.js'
import create from '../controllers/lidoPeloUser/create.js'
import update from '../controllers/lidoPeloUser/update.js'
import remove from '../controllers/lidoPeloUser/remove.js'

const router = Router();

router.get('/', listAll)
router.get('/:id', getById)
router.post('/', create)
router.put('/:id', update)
router.delete('/:id', remove)

export default router;
