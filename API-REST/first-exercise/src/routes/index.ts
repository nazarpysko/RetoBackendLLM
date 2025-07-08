import { Router } from 'express';
import jokesRouter from './jokes.routes';
import mathRouter from './math.routes';
const router = Router();

const apiV1Router = Router();

apiV1Router.use('/jokes', jokesRouter);
apiV1Router.use('/math', mathRouter);

router.use('/api/v1', apiV1Router);
export default router;
