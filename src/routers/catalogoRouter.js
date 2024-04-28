import { Router } from 'express';
import listAll from '../controllers/catalogo/listAll.js'
import getById from '../controllers/catalogo/getById.js'
import create from '../controllers/catalogo/create.js'
import update from '../controllers/catalogo/update.js'
import remove from '../controllers/catalogo/remove.js'
import getRank from '../controllers/catalogo/getRank.js';

const router = Router();

router.get('/', listAll)
router.get('/rank', getRank)
router.get('/:id', getById)
router.post('/', create)
router.put('/:id', update)
router.delete('/:id', remove)

export default router;
