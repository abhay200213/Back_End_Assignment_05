import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';                           //  Helmet added
import { employeeRouter } from './api/v1/routes/employeeRoutes';
import { branchRouter } from './api/v1/routes/branchRoutes';

const app = express();

app.use(express.json());
app.use(morgan('combined'));

//  ---------------- SECURITY MIDDLEWARE (HELMET) ----------------

// Custom Helmet configuration recommended for APIs
app.use(
  helmet({
    contentSecurityPolicy: false,     // Swagger & APIs often break with strict CSP
    referrerPolicy: { policy: 'no-referrer' },
    crossOriginResourcePolicy: { policy: 'same-site' },
    xssFilter: true,                   // Older Helmet XSS protection
    noSniff: true,                     // Prevent MIME-type sniffing
    permittedCrossDomainPolicies: { policy: 'none' },
  })
);

//  Additional recommended security headers for APIs
app.use(helmet.hsts({ maxAge: 63072000 }));   // Force HTTPS (safe for prod)
app.use(helmet.frameguard({ action: 'deny' })); // Prevent clickjacking
app.use(helmet.hidePoweredBy());               // Hide X-Powered-By: Express

// ---------------------------------------------------------------

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.status(200).send('Server is healthy');
});

// Employee API
app.use('/api/v1/employees', employeeRouter);

// Branch API
app.use('/api/v1/branches', branchRouter);

export default app;
