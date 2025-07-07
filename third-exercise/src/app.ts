import express from 'express';
import routes from './routes';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './docs/swaggerConfig';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = 3000;

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Set parser for request body
app.use(express.json());
app.use('/', routes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

export default app;
