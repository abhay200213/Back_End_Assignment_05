import express, { Request, Response } from 'express';
import morgan from 'morgan';
import { employeeRouter } from './api/v1/routes/employeeRoutes';
import { branchRouter } from './api/v1/routes/branchRoutes';

const app = express();

app.use(express.json());
app.use(morgan('combined'));

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.status(200).send('Server is healthy');
});

// Employee API
app.use('/api/v1/employees', employeeRouter);

// Branch API
app.use('/api/v1/branches', branchRouter);

export default app;
