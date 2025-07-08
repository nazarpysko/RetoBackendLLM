import { Router } from 'express';
import consultaRouter from './consulta.route';
const router = Router();

const apiV1Router = Router();

apiV1Router.use('/consulta', consultaRouter);

router.use('/api/v1', apiV1Router);
export default router;
