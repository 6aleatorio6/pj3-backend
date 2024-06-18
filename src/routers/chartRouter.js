import { Router } from "express";
import visitaAno from "../controllers/chart/visitaAno.js";
import { useGuard } from "../services/auth/guardJwt.js";
import visitaAllTime from "../controllers/chart/visitaAllTime.js";
import visitaMes from "../controllers/chart/visitaMes.js";
const router = Router()

router.get('/ano', useGuard('ADM'), visitaAno)
router.get('/mes', useGuard('ADM'), visitaMes)
router.get('/', useGuard('ADM'), visitaAllTime)

export default router