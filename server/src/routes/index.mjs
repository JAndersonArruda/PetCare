import { Router } from "express";
import userRouter from './users.mjs';
import petRouter from './pet.mjs';
import clinicaRouter from './clinica.mjs';


const router = Router();

router.use(userRouter);
router.use(petRouter);
router.use(clinicaRouter);

export default router;