import express from 'express';
import routes from './routes';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './docs/swaggerConfig';
import { logger } from './middleware/logger';

import { connectToDatabase } from './database/mongo';

const app = express();
const port = 3000;

// Logger middleware
app.use(logger);

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Set parser for request body
app.use(express.json());
app.use('/', routes);

connectToDatabase();

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

export default app;
