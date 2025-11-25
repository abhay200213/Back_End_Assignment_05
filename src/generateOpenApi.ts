import fs from 'fs';
import path from 'path';
import { swaggerSpec } from './swagger';

// Path: projectRoot/docs/openapi.json
const outputPath = path.resolve(__dirname, '../docs/openapi.json');

fs.mkdirSync(path.dirname(outputPath), { recursive: true });

fs.writeFileSync(outputPath, JSON.stringify(swaggerSpec, null, 2), 'utf8');

console.log(` OpenAPI spec written to: ${outputPath}`);
