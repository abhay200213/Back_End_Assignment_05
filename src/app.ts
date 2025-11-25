import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import { employeeRouter } from './api/v1/routes/employeeRoutes';
import { branchRouter } from './api/v1/routes/branchRoutes';

const app = express();

app.use(express.json());
app.use(morgan('combined'));

//  ---------------- SECURITY MIDDLEWARE (HELMET) ----------------

// Base Helmet for APIs, with CSP & COEP disabled to avoid issues with tools like Swagger
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

// Extra API-focused headers
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

// HSTS (mainly effective in production over HTTPS)
app.use(
  helmet.hsts({
    maxAge: 63072000, // 2 years
    includeSubDomains: true,
    preload: false,
  })
);

// Clickjacking protection
app.use(
  helmet.frameguard({
    action: 'deny',
  })
);

// Hide Express fingerprint
app.use(helmet.hidePoweredBy());

//  --------------------------------------------------------------

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.status(200).send('Server is healthy');
});

// Employee API
app.use('/api/v1/employees', employeeRouter);

// Branch API
app.use('/api/v1/branches', branchRouter);

export default app;
