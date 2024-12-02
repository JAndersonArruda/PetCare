import { Router } from "express";
import userRouter from './users.mjs';
import petRouter from './pet.mjs';


const router = Router();

router.use(userRouter);
router.use(petRouter);

export default router;