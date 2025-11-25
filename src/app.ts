import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import { employeeRouter } from './api/v1/routes/employeeRoutes';
import { branchRouter } from './api/v1/routes/branchRoutes';

const app = express();

app.use(express.json());
app.use(morgan('combined'));

// ---------------- HELMET SECURITY ----------------
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

app.use(
  helmet.referrerPolicy({
    policy: 'no-referrer',
  })
);

app.use(
  helmet.crossOriginResourcePolicy({
    policy: 'same-site',
  })
);

app.use(
  helmet.hsts({
    maxAge: 63072000,
    includeSubDomains: true,
    preload: false,
  })
);

app.use(
  helmet.frameguard({
    action: 'deny',
  })
);

app.use(helmet.hidePoweredBy());

// ---------------- CORS SECURITY ------------------

// Only allow your dev frontend
const allowedOrigin = 'http://localhost:5173';

app.use(
  cors({
    origin: allowedOrigin,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['X-Total-Count'],
    credentials: false,
    optionsSuccessStatus: 204,
  })
);

// -----------------------------------------------

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.status(200).send('Server is healthy');
});

// Employee API
app.use('/api/v1/employees', employeeRouter);

// Branch API
app.use('/api/v1/branches', branchRouter);

export default app;
