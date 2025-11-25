import { Express } from 'express';
import helmet from 'helmet';

export const setupSecurity = (app: Express) => {
  // Base Helmet with custom options tuned for an API
  app.use(
    helmet({
      // For APIs (JSON + Swagger UI), CSP is often tricky; disable or customize.
      contentSecurityPolicy: false,

      // Don't leak referrer info
      referrerPolicy: { policy: 'no-referrer' },

      // Restrict who can load your resources
      crossOriginResourcePolicy: { policy: 'same-site' },

      // Strict-Transport-Security: only really makes sense in production over HTTPS
      // We'll leave the default ON in production and effectively ignore it in dev.
      // (Helmet automatically only sends it over HTTPS.)
    }),
  );

  // If you want **even stricter** headers for an API, you can add more here later.
};
