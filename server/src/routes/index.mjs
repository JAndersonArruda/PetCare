import { Router } from "express";
import userRouter from './users.mjs';
import petRouter from './pet.mjs';
import clinicaRouter from './clinica.mjs';
import serviceRouter from './service.mjs';


const router = Router();

router.use(userRouter);
router.use(petRouter);
router.use(clinicaRouter);
router.use(serviceRouter);

export default router;