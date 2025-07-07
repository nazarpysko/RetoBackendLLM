import { Router } from "express";
import jokesRouter from "./jokes.routes";

const router = Router();

router.use('/api/v1/chistes', jokesRouter);

export default router;