import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Back-End Assignment 5 API',
      version: '1.0.0',
      description: 'Comprehensive API documentation for Assignment 5',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local Development Server',
      },
    ],
  },

  // Scan route files and validation files (where Joi schemas live)
  apis: [
    path.resolve(__dirname, './api/v1/routes/*.ts'),
    path.resolve(__dirname, './api/v1/validation/*.ts'),
  ],
};

export const swaggerSpec = swaggerJSDoc(options);
