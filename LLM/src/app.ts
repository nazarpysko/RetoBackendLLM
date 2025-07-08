
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import routes from './routes';
import { logger } from './middleware/logger';

const app = express();
const port = 3000;

// Logger middleware
app.use(logger);

app.use(express.json());
app.use('/', routes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

export default app;