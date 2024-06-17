import { Router } from "express";

import criacaoExcel from '../controllers/excelJs/excelInfo.js'

const router = Router();

// router.post('/listar-usuarios', todosUsuariosExcel)
router.get('/listar-visitas', criacaoExcel)

export default router;